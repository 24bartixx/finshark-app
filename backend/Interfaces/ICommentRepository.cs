using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comment;
using backend.Model;

namespace backend.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment comment);
        Task<Comment?> UpdateAsync(int id, UpdateCommentDto updateCommentDto);
        Task<Comment?> DeleteAsync(int id);
    }
}