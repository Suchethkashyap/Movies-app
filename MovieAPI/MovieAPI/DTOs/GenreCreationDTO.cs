using MovieAPI.Validation;
using System.ComponentModel.DataAnnotations;

namespace MovieAPI.DTO
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string? Name { get; set; }
    }
}
