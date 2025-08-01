using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comment;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Model;
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

        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo, UserManager<AppUser> userManager)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
            _userManager = userManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync();
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

        [HttpPost("{stockId:int}")]
         public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentDto createCommentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await _stockRepo.StockExists(stockId))
            {
                return BadRequest("The stock does not exist.");
            }

            string username = User.GetUsername();
            AppUser appUser = await _userManager.FindByNameAsync(username);

            Comment newComment = createCommentDto.ToCommentFromCreate(stockId);
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