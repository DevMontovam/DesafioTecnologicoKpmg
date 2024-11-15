public class Registration
{
    private static int _nextId = 1;

    public int Id { get; }
    public string? Name {get; set; }
    public string? CPF { get; set; }  
    public string? RegistrationNumber { get; set; }  
    public string? Email { get; set; }  
    public DateTime RegistrationDate { get; set; }

    public Registration()
    {
        Id = _nextId++;
        RegistrationDate = DateTime.UtcNow;
    }
}
