using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Comment
{
    public class CommentSearchParamsDto
    {
        public string Symbol { get; set; }
        public bool IsDescending { get; set; } = true;
    }
}