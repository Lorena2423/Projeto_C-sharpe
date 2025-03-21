using System;
using System.Collections.Generic;

namespace Sistema_processos.Models;

public partial class Documento
{
    public int Id { get; set; }

    public int? ProcessoId { get; set; }

    public string? Arquivo { get; set; }

    public DateTime? DataAnexo { get; set; }

    public virtual Processo? Processo { get; set; }
}
