import useDocumentMeta from "../../hooks/useDocumentMeta";
import LegalLayout, { LegalSection } from "../../components/Legal/LegalLayout";

export default function TermsOfUse() {
  useDocumentMeta({
    title: "Termos de Uso",
    description:
      "Condições gerais de uso do site de Vítor Freitas, incluindo direitos autorais sobre o portfólio e limitação de responsabilidade.",
    path: "/termos-de-uso",
  });

  return (
    <LegalLayout
      eyebrow="Condições Gerais"
      title="Termos de Uso"
      updatedAt="03 de agosto de 2026"
    >
      <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
        Estes Termos de Uso regulam o acesso e a utilização do site de{" "}
        <strong className="text-white">Vítor Freitas</strong>, filmmaker e
        fotógrafo. Ao acessar este site, você concorda integralmente com
        as condições descritas abaixo. Caso não concorde, recomendamos
        que não utilize o site.
      </p>

      <LegalSection title="1. Aceitação dos termos">
        <p>
          O uso deste site implica a aceitação plena e sem reservas de
          todas as disposições contidas nestes Termos de Uso, bem como
          da nossa{" "}
          <a href="/politica-de-privacidade" className="text-[var(--color-gold)] hover:underline">
            Política de Privacidade
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Descrição do serviço">
        <p>
          Este site tem como finalidade apresentar o portfólio de
          fotografia e filmagem de Vítor Freitas, bem como permitir o
          contato de potenciais clientes para orçamentos e agendamentos
          de sessões.
        </p>
      </LegalSection>

      <LegalSection title="3. Propriedade intelectual">
        <p>
          Todo o conteúdo disponível neste site — incluindo fotografias,
          vídeos, textos, marca, logotipo e identidade visual — é de
          propriedade de Vítor Freitas ou de seus respectivos clientes e
          está protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998).
          É proibida a reprodução, distribuição, modificação ou uso
          comercial de qualquer material sem autorização prévia e por
          escrito.
        </p>
      </LegalSection>

      <LegalSection title="4. Uso adequado do site">
        <p>Ao utilizar este site, você se compromete a não:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Utilizar o site para fins ilícitos ou não autorizados;</li>
          <li>Tentar acessar áreas restritas ou dados de terceiros sem autorização;</li>
          <li>Reproduzir, copiar ou explorar comercialmente o conteúdo do site sem consentimento;</li>
          <li>Enviar informações falsas nos formulários de contato e agendamento.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Formulário de contato e agendamento">
        <p>
          O envio do formulário de contato representa uma{" "}
          <strong className="text-white">solicitação de orçamento/agendamento</strong>,
          não uma confirmação automática de serviço. A confirmação
          definitiva de data, horário e condições comerciais ocorre
          somente após contato direto e acordo entre as partes, conforme
          descrito nos{" "}
          <a href="/termos-de-agendamento" className="text-[var(--color-gold)] hover:underline">
            Termos de Agendamento e Compromisso
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Links para sites de terceiros">
        <p>
          Este site pode conter links para redes sociais e outros sites
          de terceiros. Não nos responsabilizamos pelo conteúdo,
          disponibilidade ou práticas de privacidade desses sites
          externos.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitação de responsabilidade">
        <p>
          Envidamos esforços para manter as informações deste site
          atualizadas e precisas, mas não garantimos a ausência total de
          erros, interrupções ou indisponibilidades. O uso do site é de
          responsabilidade do usuário.
        </p>
      </LegalSection>

      <LegalSection title="8. Alterações destes termos">
        <p>
          Estes Termos de Uso podem ser atualizados a qualquer momento,
          sem aviso prévio, para refletir mudanças no site ou na
          legislação aplicável. Recomendamos a consulta periódica desta
          página.
        </p>
      </LegalSection>

      <LegalSection title="9. Legislação aplicável e foro">
        <p>
          Estes Termos de Uso são regidos pelas leis da República
          Federativa do Brasil. Fica eleito o foro da Comarca do Rio de
          Janeiro — RJ para dirimir quaisquer controvérsias decorrentes
          destes termos, com renúncia a qualquer outro, por mais
          privilegiado que seja.
        </p>
      </LegalSection>

      <LegalSection title="10. Contato">
        <p>
          Dúvidas sobre estes Termos de Uso podem ser enviadas para{" "}
          <a href="mailto:contato@vitorfreitas.com" className="text-[var(--color-gold)] hover:underline">
            contato@vitorfreitas.com
          </a>
          .
        </p>
      </LegalSection>

      <p className="text-xs text-white/30 pt-6 border-t border-white/[.08]">
        Este documento tem caráter informativo geral e não substitui a
        avaliação de um advogado para adequação total às particularidades
        do negócio.
      </p>
    </LegalLayout>
  );
}
