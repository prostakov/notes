using System;

namespace NotesApi.Models
{
    public class UpdateNoteModel
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
    }
}