namespace server.DTOs
{
    public class ReviewHistoryDto
    {
        public string Filename { get; set; } = string.Empty;
        public string[] Categories { get; set; } = new string[0];
        public string Model { get; set; } = string.Empty;
        public string ReviewContent { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class SaveReviewDto
    {
        public string UserEmail { get; set; } = string.Empty;
        public string Filename { get; set; } = string.Empty;
        public string[] Categories { get; set; } = new string[0];
        public string Model { get; set; } = string.Empty;
        public string ReviewContent { get; set; } = string.Empty;
    }
}
