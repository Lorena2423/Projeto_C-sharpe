using System;
using System.Collections.Generic;

namespace Sistema_processos.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string Nome { get; set; } = null!;

    public virtual ICollection<Processo> ProcessoClientes { get; set; } = new List<Processo>();

    public virtual ICollection<Processo> ProcessoProcuradors { get; set; } = new List<Processo>();
}
