import useDocumentMeta from "../../hooks/useDocumentMeta";
import LegalLayout, { LegalSection } from "../../components/Legal/LegalLayout";

export default function PrivacyPolicy() {
  useDocumentMeta({
    title: "Política de Privacidade",
    description:
      "Saiba como Vítor Freitas coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
    path: "/politica-de-privacidade",
  });

  return (
    <LegalLayout
      eyebrow="LGPD · Lei nº 13.709/2018"
      title="Política de Privacidade"
      updatedAt="03 de agosto de 2026"
    >
      <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
        Esta Política de Privacidade descreve como <strong className="text-white">Vítor Freitas</strong> ("nós",
        "controlador") coleta, utiliza, armazena e protege os dados pessoais
        das pessoas que visitam este site ou entram em contato para
        solicitar orçamentos e agendamentos de serviços de fotografia e
        filmagem. Ao utilizar este site e seus formulários, você concorda
        com as práticas descritas abaixo.
      </p>

      <LegalSection title="1. Dados que coletamos">
        <p>Coletamos os seguintes dados quando você preenche o formulário de contato/agendamento:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Nome completo;</li>
          <li>E-mail;</li>
          <li>Número de WhatsApp;</li>
          <li>Endereço do local do trabalho/sessão;</li>
          <li>Data e horário desejados para o agendamento;</li>
          <li>Tipo de projeto e mensagem com detalhes da solicitação.</li>
        </ul>
        <p>
          Também podemos coletar dados de navegação de forma automática
          (como páginas visitadas, tempo de sessão e dispositivo utilizado)
          por meio de cookies e ferramentas de analytics, conforme a seção 4.
        </p>
      </LegalSection>

      <LegalSection title="2. Finalidade do tratamento">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Responder solicitações de orçamento e contato;</li>
          <li>Organizar e confirmar agendamentos de sessões fotográficas e filmagens;</li>
          <li>Enviar comunicações relacionadas ao projeto contratado;</li>
          <li>Cumprir obrigações legais e contratuais;</li>
          <li>Melhorar a experiência de navegação no site.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Base legal">
        <p>
          O tratamento dos seus dados pessoais é realizado com base no
          consentimento (art. 7º, I, da LGPD), fornecido ao preencher e
          enviar o formulário de contato, e na execução de procedimentos
          preliminares relacionados a um eventual contrato (art. 7º, V,
          da LGPD).
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies e ferramentas de terceiros">
        <p>
          Este site pode utilizar cookies próprios e de terceiros para
          funcionamento técnico e análise de audiência (por exemplo,
          Google Analytics). Você pode desabilitar cookies diretamente
          nas configurações do seu navegador, mas isso pode afetar
          algumas funcionalidades do site.
        </p>
      </LegalSection>

      <LegalSection title="5. Compartilhamento de dados">
        <p>
          Não vendemos seus dados pessoais. Eles podem ser compartilhados
          apenas com prestadores de serviço estritamente necessários à
          operação do negócio (como ferramentas de e-mail, agenda e
          hospedagem), sempre sob obrigação de confidencialidade, ou
          quando exigido por lei ou ordem judicial.
        </p>
      </LegalSection>

      <LegalSection title="6. Armazenamento e segurança">
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para
          proteger seus dados contra acesso não autorizado, perda,
          alteração ou destruição. Os dados são mantidos apenas pelo
          tempo necessário ao cumprimento das finalidades descritas
          nesta política ou de obrigações legais.
        </p>
      </LegalSection>

      <LegalSection title="7. Seus direitos como titular">
        <p>Nos termos da LGPD, você tem direito a:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Confirmar a existência de tratamento dos seus dados;</li>
          <li>Acessar, corrigir ou atualizar seus dados;</li>
          <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Solicitar a portabilidade dos dados;</li>
          <li>Revogar o consentimento a qualquer momento;</li>
          <li>Solicitar informações sobre com quem seus dados foram compartilhados.</li>
        </ul>
        <p>
          Para exercer qualquer um desses direitos, entre em contato pelo
          e-mail{" "}
          <a href="mailto:contato@vitorfreitas.com" className="text-[var(--color-gold)] hover:underline">
            contato@vitorfreitas.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Direito de imagem">
        <p>
          Fotos e vídeos produzidos em sessões contratadas podem ser
          utilizados para fins de portfólio e divulgação do trabalho,
          exceto quando o cliente solicitar expressamente, por escrito,
          o uso restrito ou exclusivo do material. Essa condição também
          é tratada nos{" "}
          <a href="/termos-de-agendamento" className="text-[var(--color-gold)] hover:underline">
            Termos de Agendamento e Compromisso
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Alterações desta política">
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente
          para refletir melhorias no site ou mudanças legais. A data da
          última atualização está sempre indicada no topo desta página.
        </p>
      </LegalSection>

      <LegalSection title="10. Contato">
        <p>
          Em caso de dúvidas sobre esta política ou sobre o tratamento
          dos seus dados pessoais, entre em contato:
        </p>
        <p>
          E-mail:{" "}
          <a href="mailto:contato@vitorfreitas.com" className="text-[var(--color-gold)] hover:underline">
            contato@vitorfreitas.com
          </a>
          <br />
          Localização: Rio de Janeiro — RJ, Brasil
        </p>
      </LegalSection>

      <p className="text-xs text-white/30 pt-6 border-t border-white/[.08]">
        Este documento tem caráter informativo geral e não substitui a
        avaliação de um advogado especializado em proteção de dados para
        adequação total às particularidades do negócio.
      </p>
    </LegalLayout>
  );
}
