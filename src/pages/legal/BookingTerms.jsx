import useDocumentMeta from "../../hooks/useDocumentMeta";
import LegalLayout, { LegalSection } from "../../components/Legal/LegalLayout";

export default function BookingTerms() {
  useDocumentMeta({
    title: "Termos de Agendamento e Compromisso",
    description:
      "Condições de agendamento, confirmação, cancelamento, reagendamento e uso de imagem para sessões de fotografia e filmagem com Vítor Freitas.",
    path: "/termos-de-agendamento",
  });

  return (
    <LegalLayout
      eyebrow="Antes de Agendar"
      title="Termos de Agendamento e Compromisso"
      updatedAt="03 de agosto de 2026"
    >
      <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
        Estes Termos de Agendamento e Compromisso regulam a solicitação e
        a realização de sessões de fotografia e filmagem com{" "}
        <strong className="text-white">Vítor Freitas</strong>. Ao marcar
        o checkbox de aceite no formulário de contato, você declara ter
        lido e concordado com as condições abaixo.
      </p>

      <LegalSection title="1. Natureza da solicitação">
        <p>
          O preenchimento do formulário com data e horário desejados
          constitui uma <strong className="text-white">solicitação de agendamento</strong>,
          sujeita à disponibilidade da agenda. Nenhum horário é
          considerado reservado até a confirmação expressa, por
          WhatsApp ou e-mail, por parte da equipe.
        </p>
      </LegalSection>

      <LegalSection title="2. Confirmação do agendamento">
        <p>
          Após o envio da solicitação, entraremos em contato para
          confirmar disponibilidade, alinhar escopo, valores e, quando
          aplicável, formalizar um orçamento ou contrato específico do
          projeto. O agendamento só é considerado definitivo após essa
          confirmação por escrito.
        </p>
      </LegalSection>

      <LegalSection title="3. Pontualidade e acesso ao local">
        <p>
          O cliente se compromete a garantir acesso ao local combinado
          no horário agendado. Atrasos podem reduzir o tempo efetivo de
          sessão sem redução proporcional de valor, e ausências no
          endereço informado podem ser tratadas como cancelamento
          conforme a seção 5.
        </p>
      </LegalSection>

      <LegalSection title="4. Reagendamento">
        <p>
          Pedidos de reagendamento devem ser feitos com, no mínimo,{" "}
          <strong className="text-white">48 (quarenta e oito) horas</strong> de
          antecedência em relação à data agendada, sujeitos à
          disponibilidade de nova data. Reagendamentos solicitados fora
          desse prazo podem estar sujeitos a cobrança adicional, a ser
          informada previamente.
        </p>
      </LegalSection>

      <LegalSection title="5. Cancelamento">
        <p>
          Cancelamentos com mais de 48 horas de antecedência não geram
          custo. Cancelamentos com menos de 48 horas de antecedência, ou
          o não comparecimento no local e horário combinados ("no-show"),
          podem estar sujeitos à cobrança total ou parcial do valor
          combinado, conforme condições específicas informadas na
          confirmação do projeto.
        </p>
      </LegalSection>

      <LegalSection title="6. Condições climáticas e força maior">
        <p>
          Para sessões externas, aéreas (drone) ou dependentes de
          condições climáticas, o agendamento poderá ser remarcado sem
          custo em caso de chuva forte, ventos ou outras condições que
          inviabilizem a captação com segurança e qualidade. O mesmo se
          aplica a casos de força maior (problemas de saúde, questões de
          segurança pública, entre outros).
        </p>
      </LegalSection>

      <LegalSection title="7. Pagamento e sinal">
        <p>
          Para determinados projetos, poderá ser solicitado um sinal
          (entrada) para confirmação definitiva da data na agenda. As
          condições de pagamento — valor, forma e prazos — são definidas
          caso a caso na proposta comercial enviada após o contato
          inicial.
        </p>
      </LegalSection>

      <LegalSection title="8. Direito de imagem e uso do material">
        <p>
          Salvo acordo em contrário formalizado por escrito, as imagens
          e vídeos produzidos poderão ser utilizados por Vítor Freitas
          para fins de portfólio, divulgação profissional e redes
          sociais. Caso o cliente deseje uso exclusivo ou restrição de
          divulgação, essa condição deve ser expressamente combinada
          antes da realização da sessão.
        </p>
      </LegalSection>

      <LegalSection title="9. Responsabilidades do cliente">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Fornecer um endereço correto e de acesso viável para a equipe;</li>
          <li>Garantir as autorizações necessárias para uso do local (quando aplicável);</li>
          <li>Informar com antecedência qualquer restrição ou necessidade especial para a sessão.</li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Aceite">
        <p>
          Ao marcar a caixa de confirmação no formulário de contato,
          você declara estar ciente e de acordo com estes Termos de
          Agendamento e Compromisso, bem como com a nossa{" "}
          <a href="/politica-de-privacidade" className="text-[var(--color-gold)] hover:underline">
            Política de Privacidade
          </a>{" "}
          e{" "}
          <a href="/termos-de-uso" className="text-[var(--color-gold)] hover:underline">
            Termos de Uso
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="11. Contato">
        <p>
          Dúvidas sobre agendamento podem ser enviadas para{" "}
          <a href="mailto:contato@vitorfreitas.com" className="text-[var(--color-gold)] hover:underline">
            contato@vitorfreitas.com
          </a>{" "}
          ou pelo WhatsApp informado na seção de contato do site.
        </p>
      </LegalSection>

      <p className="text-xs text-white/30 pt-6 border-t border-white/[.08]">
        Este documento tem caráter informativo geral e não substitui a
        avaliação de um advogado para adequação total às particularidades
        do negócio e de cada contrato de prestação de serviço.
      </p>
    </LegalLayout>
  );
}
