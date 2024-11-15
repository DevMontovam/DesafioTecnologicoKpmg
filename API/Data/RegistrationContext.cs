using Microsoft.EntityFrameworkCore;

public class RegistrationContext : DbContext
{
    public RegistrationContext(DbContextOptions<RegistrationContext> options) : base(options) { }

    public DbSet<Registration> Registrations { get; set; }
}

