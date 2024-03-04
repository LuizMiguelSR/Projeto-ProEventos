using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [
            Required(ErrorMessage = "O campo {0} é obrigatório"),
            //MinLength(3, ErrorMessage ="{0} deve ter no mínimo 4 caracteres."),
           //MaxLength(50, ErrorMessage ="{0} deve ter no máximo 50 caracteres.")
           StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")
        ]
        public string Tema { get; set; }
        public int QtdePessoas { get; set; }
        public string Lote { get; set; }
        public string ImagemURL { get; set; }
        public int Telefone { get; set; }
        [EmailAddress(ErrorMessage = "O campo {0} precisa ser um e-mail válido")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}