using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController : ControllerBase
{
    private static readonly List<Registration> Registrations = new List<Registration>();
    private readonly IWebHostEnvironment _environment;

    public RegistrationController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpGet]
    public IActionResult GetRegistrations()
    {
        return Ok(Registrations);
    }

    [HttpPost]
    public IActionResult AddRegistration([FromBody] Registration newRegistration)
    {
        if (Registrations.Any(r => 
                // r.CPF == newRegistration.CPF || 
                // r.RegistrationNumber == newRegistration.RegistrationNumber || 
                r.Email == newRegistration.Email))
        {
            return Conflict(new { message = "Registro já existe com o email fornecido." });
        }

        Registrations.Add(newRegistration);
        return Ok(new { message = "Registro adicionado com sucesso!", data = newRegistration });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateRegistration(int id, [FromBody] Registration updatedRegistration)
    {
        var existingRegistration = Registrations.Find(r => r.Id == id);
        if (existingRegistration == null)
            return NotFound(new { message = "Registro não encontrado." });

        if (Registrations.Any(r => (
                // r.CPF == updatedRegistration.CPF || 
                //  r.RegistrationNumber == updatedRegistration.RegistrationNumber || 
                r.Email == updatedRegistration.Email) &&
                r.Id != id))
        {
            return Conflict(new { message = "Outro registro já existe com o CPF, matrícula ou email fornecido." });
        }

        existingRegistration.Name = updatedRegistration.Name;
        // existingRegistration.CPF = updatedRegistration.CPF;
        // existingRegistration.RegistrationNumber = updatedRegistration.RegistrationNumber;
        existingRegistration.Email = updatedRegistration.Email;

        return Ok(new { message = "Registro atualizado com sucesso!", data = existingRegistration });
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteRegistration(int id)
    {
        var registration = Registrations.Find(r => r.Id == id);
        if (registration == null)
            return NotFound();

        Registrations.Remove(registration);
        return Ok(new { message = "Registro deletado com sucesso!" });
    }
}
