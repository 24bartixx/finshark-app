using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comment;
using backend.Interfaces;
using backend.Mappers;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("/api/comment/")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;


        public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo)
        {
            _commentRepo = commentRepo;
            _stockRepo = stockRepo;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepo.GetAllAsync();
            var commentsDtos = comments.Select(e => e.ToCommentDto());
            return Ok(commentsDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{stockId}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentDto createCommentDto)
        {
            if (!await _stockRepo.StockExists(stockId))
            {
                return BadRequest("The stock does not exist.");
            }

            Comment newComment = createCommentDto.ToCommentFromCreate(stockId);
            await _commentRepo.CreateAsync(newComment);

            return CreatedAtAction(nameof(GetById), new { id = newComment.Id }, newComment.ToCommentDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateCommentDto updateCommentDto)
        {
            Comment? comment = await _commentRepo.UpdateAsync(id, updateCommentDto);

            if (comment == null)
            {
                return NotFound("Comment does not exist.");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpDelete("{id}")]
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