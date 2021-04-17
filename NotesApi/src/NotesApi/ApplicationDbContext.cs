using Microsoft.EntityFrameworkCore;
using NotesApi.Models;

namespace NotesApi
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<NoteModel>().ToTable("Notes");
            builder.Entity<NoteModel>().HasKey(p => p.Id);
            builder.Entity<NoteModel>().Property(p => p.Text)
                .HasMaxLength(5000)
                .IsRequired();
        }
        
        public DbSet<NoteModel> Notes { get; set; }
    }
}