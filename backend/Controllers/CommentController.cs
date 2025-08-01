using backend.Dtos.Comment;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("/api/comment/")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFinancialModelingService _fmpService;

        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo,
            UserManager<AppUser> userManager, IFinancialModelingService fmpPService)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
            _fmpService = fmpPService;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] CommentSearchParamsDto commentSearchParamsDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync(commentSearchParamsDto);
            var commentsDtos = comments.Select(e => e.ToCommentDto());
            return Ok(commentsDtos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{symbol:alpha}")]
         public async Task<IActionResult> Create([FromRoute] string symbol, [FromBody] CreateCommentDto createCommentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Stock? stock = await _stockRepo.GetBySymbolAsync(symbol);

            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);

                if (stock == null)
                {
                    return BadRequest("Stock does not exist");
                }

                await _stockRepo.CreateAsync(stock);
            }

            string username = User.GetUsername();
            AppUser appUser = await _userManager.FindByNameAsync(username);

            Comment newComment = createCommentDto.ToCommentFromCreate(stock.Id);
            newComment.AppUserId = appUser.Id;
            
            await _commentRepo.CreateAsync(newComment);

            return CreatedAtAction(nameof(GetById), new { id = newComment.Id }, newComment.ToCommentDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateCommentDto updateCommentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment? comment = await _commentRepo.UpdateAsync(id, updateCommentDto);

            if (comment == null)
            {
                return NotFound("Comment does not exist.");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            Comment? comment = await _commentRepo.DeleteAsync(id);
            if (comment == null)
            {
                return NotFound("Comment does not exist.");
            }

            return Ok(comment.ToCommentDto());
        }

    }
}