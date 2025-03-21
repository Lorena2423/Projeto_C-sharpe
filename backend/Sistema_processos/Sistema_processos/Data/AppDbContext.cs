using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using Sistema_processos.Models;

namespace Sistema_processos.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Documento> Documentos { get; set; }

    public virtual DbSet<Processo> Processos { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=processos_db;user=root;password=Mey242006@", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.41-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Documento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("documentos");

            entity.HasIndex(e => e.ProcessoId, "processo_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Arquivo)
                .HasMaxLength(255)
                .HasColumnName("arquivo");
            entity.Property(e => e.DataAnexo)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("data_anexo");
            entity.Property(e => e.ProcessoId).HasColumnName("processo_id");

            entity.HasOne(d => d.Processo).WithMany(p => p.Documentos)
                .HasForeignKey(d => d.ProcessoId)
                .HasConstraintName("documentos_ibfk_1");
        });

        modelBuilder.Entity<Processo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("processos");

            entity.HasIndex(e => e.ClienteId, "fk_cliente");

            entity.HasIndex(e => e.ProcuradorId, "fk_procurador");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Assunto)
                .HasMaxLength(255)
                .HasColumnName("assunto");
            entity.Property(e => e.ClienteId).HasColumnName("cliente_id");
            entity.Property(e => e.DataFim).HasColumnName("data_fim");
            entity.Property(e => e.DataInicio).HasColumnName("data_inicio");
            entity.Property(e => e.Descricao)
                .HasColumnType("text")
                .HasColumnName("descricao");
            entity.Property(e => e.Nome)
                .HasMaxLength(255)
                .HasColumnName("nome");
            entity.Property(e => e.Numero)
                .HasMaxLength(255)
                .HasColumnName("numero");
            entity.Property(e => e.ProcuradorId).HasColumnName("procurador_id");
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .HasColumnName("status");

            entity.HasOne(d => d.Cliente).WithMany(p => p.ProcessoClientes)
                .HasForeignKey(d => d.ClienteId)
                .HasConstraintName("fk_cliente");

            entity.HasOne(d => d.Procurador).WithMany(p => p.ProcessoProcuradors)
                .HasForeignKey(d => d.ProcuradorId)
                .HasConstraintName("fk_procurador");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(255)
                .HasColumnName("nome");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasColumnType("enum('procurador','cliente')")
                .HasColumnName("role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
