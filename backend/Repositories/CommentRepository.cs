using backend.Data;
using backend.Dtos.Comment;
using backend.Interfaces;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;

        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentDto updateCommentDto)
        {
            Comment? existingComment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

            if (existingComment == null)
            {
                return existingComment;
            }

            existingComment.Title = updateCommentDto.Title;
            existingComment.Content = updateCommentDto.Content;

            await _context.SaveChangesAsync();

            return existingComment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            Comment? comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

            if (comment == null)
            {
                return null;
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}