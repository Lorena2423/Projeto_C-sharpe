using System;
using System.Collections.Generic;

namespace Sistema_processos.Models;

public partial class Processo
{
    public int Id { get; set; }

    public string Numero { get; set; } = null!;

    public string? Assunto { get; set; }

    public string? Status { get; set; }

    public int? ProcuradorId { get; set; }

    public int? ClienteId { get; set; }

    public string Nome { get; set; } = null!;

    public string? Descricao { get; set; }

    public DateOnly? DataInicio { get; set; }

    public DateOnly? DataFim { get; set; }

    public virtual User? Cliente { get; set; }

    public virtual ICollection<Documento> Documentos { get; set; } = new List<Documento>();

    public virtual User? Procurador { get; set; }
}
