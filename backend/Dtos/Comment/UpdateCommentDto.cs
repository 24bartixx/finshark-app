using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Comment
{
    public class UpdateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must consist of at least 5 characters")]
        [MaxLength(64, ErrorMessage = "Title cannot consist of more than 64 characters")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(5, ErrorMessage = "Content must consist of at least 5 characters")]
        [MaxLength(180, ErrorMessage = "Content cannot consist of more than 180 characters")]
        public string Content { get; set; } = string.Empty;
    }
}