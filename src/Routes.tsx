import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Overlay from "./components/Overlay";
import { PageBody } from "./components/PageBody";
import ProtectedRoute from "./components/ProtectedRoute";
import { PROFILES } from "./enums/PROFILES.enum";
import { CadastroPecasLazy } from "./pages/Dashboard/Procurador/CadastroPecas/semProcesso";
import { VisuPecasLazy } from "./pages/Dashboard/Procurador/CadastroPecas/visualizar";
import ConsultModels from "./pages/Dashboard/Procurador/ListarModelosPecas";
import NotAuthorized from "./pages/NotAuthorized";
import Splash from "./pages/Splash";

const Login = lazy(() => import("./pages/Login"));

/* //Attorney
const CadastroModelosPecas = lazy(
    () => import("./pages/Dashboard/Procurador/CadastrarModelos")
); */

// Process

const Consult = lazy(() => import("./pages/Dashboard/Process/Consult"));
const RegisterAct = lazy(() => import("./pages/Dashboard/Process/RegisterAct"));
const EditAct = lazy(() => import("./pages/Dashboard/Process/EditAct"));
const Indices = lazy(() => import("./pages/Dashboard/Process/Indices"));
const CompletedActs = lazy(
  () => import("./pages/Dashboard/Process/CompletedActs")
);
const RegisterProcess = lazy(
  () => import("./pages/Dashboard/Process/RegisterProcess")
);
const CadastroProcessos = lazy(
  () => import("./pages/Dashboard/Process/CadastroProcessos")
);
const PartesDeProcessos = lazy(
  () => import("./pages/Dashboard/Process/PartesDeProcessos")
);
const AdicionarUsuarioProcessoSigiloso = lazy(
  () => import("./pages/Dashboard/Process/AdicionarUsuarioProcessoSigiloso")
);

// Auxiliary Records

const Comarcas = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Comarcas")
);
const PontosFacultativos = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/PontosFacultativos")
);

const CredenciaisPje = lazy(
  () => import("./pages/Dashboard/Management/Credenciais")
);

const Assuntos = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Assuntos")
);
const Partes = lazy(() => import("./pages/Dashboard/AuxiliaryRecords/Partes"));
const Ausencias = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Ausencias")
);
const Caixas = lazy(() => import("./pages/Dashboard/AuxiliaryRecords/Caixas"));
const Materias = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Materias")
);
const CadastroAusencias = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/CadastroAusencia")
);
const EditarAusencia = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/EditarAusencia")
);
const Motoristas = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Motoristas")
);
const OrgaosJulgadores = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/OrgaosJulgadores")
);
const SistemasProcessuais = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/SistemasProcessuais")
);
const TiposAusencias = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/TiposAusencias")
);
const RelevanciaProcessoLazy = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/RelevanciaProcesso")
);
const Tribunais = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Tribunais")
);

const OrigemDespesa = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/OrigemDespesa")
);
const NaturezaDespesa = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/NaturezaDespesa")
);
const Especializadas = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Especializadas")
);
const Usuarios = lazy(
  () => import("./pages/Dashboard/AuxiliaryRecords/Usuarios")
);
const Menus = lazy(() => import("./pages/Dashboard/AuxiliaryRecords/Perfis"));

// Requisitorios
const ConsultaRequisitorios = lazy(
  () => import("./pages/Dashboard/Requisitories/Consulta")
);

//Accounting
const CalculosInicio = lazy(
  () => import("./pages/Dashboard/Accounting/Calculation/CalculosInicio")
);
const Calculation = lazy(
  () => import("./pages/Dashboard/Accounting/Calculation")
);
const BaseDeCalculo = lazy(
  () => import("./pages/Dashboard/Accounting/Calculation/BaseDeCalculo")
);
const PlanilhaDeCalculo = lazy(
  () => import("./pages/Dashboard/Accounting/Calculation/PlanilhaDeCalculo")
);
const ResultadoDoCalculo = lazy(
  () => import("./pages/Dashboard/Accounting/Calculation/ResultadoDoCalculo")
);
const ConsultCalculations = lazy(
  () => import("./pages/Dashboard/Accounting/ConsultCalculations")
);
const RequestReasons = lazy(
  () => import("./pages/Dashboard/Accounting/RequestReasons")
);
const ResponseOfProcessForms = lazy(
  () => import("./pages/Dashboard/Accounting/ResponseOfProcessForms")
);
const RedistributionOfCaseFiles = lazy(
  () => import("./pages/Dashboard/Accounting/RedistributionOfCaseFiles")
);
const Rubricas = lazy(() => import("./pages/Dashboard/Accounting/Rubrica"));
const ErgonRubricas = lazy(
  () => import("./pages/Dashboard/Accounting/ErgonHeadings")
);
const IncomeTaxTable = lazy(
  () => import("./pages/Dashboard/Accounting/IncomeTaxTable")
);
const ProceduralFilesDistribution = lazy(
  () => import("./pages/Dashboard/Accounting/ProceduralFilesDistribution")
);
BaseDeCalculo;
const ProceduralForwarding = lazy(
  () => import("./pages/Dashboard/Accounting/ProceduralForwarding")
);
const ProceduralForwardingResponse = lazy(
  () => import("./pages/Dashboard/Accounting/ProceduralForwarding/Response")
);
const RespostaContador = lazy(
  () => import("./pages/Dashboard/Accounting/Calculation/RespostaContador")
);
const RecordClosedProceedings = lazy(
  () => import("./pages/Dashboard/Accounting/RecordClosedProceedings")
);
const ReturnReasons = lazy(
  () => import("./pages/Dashboard/Accounting/ReturnReasons")
);
const Ergon = lazy(() => import("./pages/Dashboard/Accounting/Ergon"));
//Management
const Attorney = lazy(() => import("./pages/Dashboard/Management/Attorney"));

const AttorneyAdvisors = lazy(
  () => import("./pages/Dashboard/Management/AttorneyAdvisors")
);
const AttorneyDispatch = lazy(
  () => import("./pages/Dashboard/Management/AttorneyDispatch")
);
const Accountant = lazy(
  () => import("./pages/Dashboard/Management/Accountant")
);
const Operator = lazy(() => import("./pages/Dashboard/Management/Operador"));

const RPV = lazy(() => import("./pages/Dashboard/Management/RPV"));

const CadastroRequisitorios = lazy(
  () => import("./pages/Dashboard/Requisitorios/novoCadastro")
);

const AttorneyGeneral = lazy(
  () => import("./pages/Dashboard/Management/AttorneyGeneral")
);

const AtosFisicosLazy = lazy(
  () => import("./pages/Dashboard/Process/AtosFisicosConcluidos")
);

//Process Details

const ProcessExtractByParty = lazy(
  () => import("./pages/Dashboard/ProcessDetails/ProcessExtractByParty")
);
const ProcessOverview = lazy(
  () => import("./pages/Dashboard/ProcessDetails/ProcessOverview")
);
const ActDetailsView = lazy(
  () => import("./pages/Dashboard/ProcessDetails/ActDetailsView")
);

//Accounting Report
const Management = lazy(
  () => import("./pages/Dashboard/AccountingReports/Management")
);
const ProceduralSheedNotClosed = lazy(
  () => import("./pages/Dashboard/AccountingReports/ProceduralSheedNotClosed")
);
const Distributions = lazy(
  () => import("./pages/Dashboard/AccountingReports/Distributions")
);

//Reports
const DistributionsReport = lazy(
  () => import("./pages/Dashboard/Reports/Distributions")
);
const PatrimoniosLazy = lazy(
  () => import("./pages/Dashboard/Management/Patrimonios")
);
const EditPatrimoniosLazy = lazy(
  () => import("./pages/Dashboard/Management/Patrimonios/Edit")
);
const CreatePatrimoniosLazy = lazy(
  () => import("./pages/Dashboard/Management/Patrimonios/Create")
);
const PaymentRequirements = lazy(
  () => import("./pages/Dashboard/Reports/PaymentRequirements")
);
const DoeDistributions = lazy(
  () => import("./pages/Dashboard/Reports/DoeDistributions")
);
const DistributionsAmount = lazy(
  () => import("./pages/Dashboard/Reports/DistributionsAmount")
);
const OperatorProductivity = lazy(
  () => import("./pages/Dashboard/Reports/OperatorProductivity")
);
const Audit = lazy(() => import("./pages/Dashboard/Reports/Audit"));
const AdvisorProductivity = lazy(
  () => import("./pages/Dashboard/Reports/AdvisorProductivity")
);
const AttorneyProductivity = lazy(
  () => import("./pages/Dashboard/Reports/AttorneyProductivity")
);
const RpvProductivity = lazy(
  () => import("./pages/Dashboard/Reports/RpvProductivity")
);
const Cases = lazy(() => import("./pages/Dashboard/Reports/Cases"));

const FinishedPieces = lazy(
  () => import("./pages/Dashboard/Reports/FinishedPieces")
);

const QuantityFinishedPieces = lazy(
  () => import("./pages/Dashboard/Reports/QuantityFinishedPieces")
);

const SubjectProceeding = lazy(
  () => import("./pages/Dashboard/Reports/SubjectProceeding")
);

const PendingDistributions = lazy(
  () => import("./pages/Dashboard/Reports/PendingDistributions")
);

const ProcessesQuantityByDeadline = lazy(
  () => import("./pages/Dashboard/Reports/ProcessesQuantityByDeadline")
);

// DCJE
const ProceduralRecord = lazy(
  () => import("./pages/Dashboard/DCJE/FichaEncaminhamentoProcessual")
);
const ProceduralDistributionRecord = lazy(
  () => import("./pages/Dashboard/DCJE/ProceduralDistributionRecord")
);
const ProceduralRedistriutionRecord = lazy(
  () => import("./pages/Dashboard/DCJE/ProceduralRedistriutionRecord")
);
const ProceduralClosedRecord = lazy(
  () => import("./pages/Dashboard/DCJE/ProceduralClosedRecord")
);

//Not found
const NotFound = lazy(() => import("./pages/NotFound"));

export const CadastroPecas = lazy(
  () => import("./pages/Dashboard/Procurador/CadastroPecas/comProcesso")
);

// Power Intelligence
const ScheduledHearings = lazy(
  () => import("./pages/Dashboard/BusinessInteligence/ScheduledHearings")
);

const FlowAct = lazy(
  () => import("./pages/Dashboard/BusinessInteligence/FlowAct")
);

const FlowActReports = lazy(
  () => import("./pages/Dashboard/BusinessInteligence/FlowActReports")
);

const ProcessesQuantityByDeadlineBI = lazy(
  () =>
    import("./pages/Dashboard/BusinessInteligence/ProcessesQuantityByDeadline")
);

const Help = lazy(() => import("./pages/Help"));

export const Router = () => (
  <Suspense fallback={<Splash />}>
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route
        element={
          <ProtectedRoute
            profileIds={[
              PROFILES.ANALISTA,
              PROFILES.PROCURADOR,
              PROFILES.ASSESSOR_PROCURADOR,
              PROFILES.CONTADOR_CHEFE,
              PROFILES.OPERADOR,
              PROFILES.CONTADOR,
              PROFILES.OPERADOR_ASSESSOR_DO_PROCURADOR,
              PROFILES.ASSESSOR_RPV,
              PROFILES.OPERADOR_CONSULTA,
              PROFILES.ASSESSOR_DE_PROCURADOR,
            ]}
          />
        }
      >
        <Route path="/dashboard" element={<Overlay />}>
          <Route path="" element={<PageBody />}>
            <Route path="" element={<Attorney />} />
          </Route>
          <Route
            path="cadastro-processos/:idAto"
            element={<CadastroProcessos />}
          />

          <Route path="cadastros-auxiliares" element={<PageBody />}>
            <Route path="comarcas" element={<Comarcas />} />
            <Route path="pontos-fac" element={<PontosFacultativos />} />
            <Route path="assuntos" element={<Assuntos />} />
            <Route path="partes" element={<Partes />} />
            <Route path="ausencias" element={<Ausencias />} />
            <Route path="caixas" element={<Caixas />} />
            <Route path="materias" element={<Materias />} />
            <Route path="cadastro-ausencias" element={<CadastroAusencias />} />

            <Route path="cadastro-ausencias/:Id" element={<EditarAusencia />} />
            <Route path="motoristas" element={<Motoristas />} />
            <Route path="orgaos-julgadores" element={<OrgaosJulgadores />} />
            <Route
              path="sistemas-processuais"
              element={<SistemasProcessuais />}
            />
            <Route path="tipos-ausencias" element={<TiposAusencias />} />
            <Route
              path="relevancias-processo"
              element={<RelevanciaProcessoLazy />}
            />
            <Route path="tribunais" element={<Tribunais />} />
            <Route path="origem-despesa" element={<OrigemDespesa />} />
            <Route path="natureza-despesa" element={<NaturezaDespesa />} />
            <Route path="especializada" element={<Especializadas />} />
            <Route path="usuario" element={<Usuarios />} />
            <Route path="menus" element={<Menus />} />
          </Route>

          <Route path="requisitorios" element={<PageBody />}>
            <Route path="consulta" element={<ConsultaRequisitorios />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                profileIds={[
                  PROFILES.PROCURADOR,
                  PROFILES.ANALISTA,
                  PROFILES.ASSESSOR_PROCURADOR,
                  PROFILES.ASSESSOR_DE_PROCURADOR,
                ]}
              />
            }
          >
            <Route path="procurador" element={<PageBody />}>
              <Route path="cadastro-peca/:idAto" element={<CadastroPecas />} />
              <Route path="cadastro-peca" element={<CadastroPecasLazy />} />
              <Route
                path="visualizar-peca/:idModelo"
                element={<VisuPecasLazy />}
              />
              <Route path="modelos-pecas" element={<ConsultModels />} />
            </Route>
          </Route>

          <Route path="processo" element={<PageBody />}>
            <Route path="consulta-processo" element={<Consult />} />
            <Route path="registro-ato" element={<RegisterAct />} />
            <Route path="registro-ato/:actId" element={<EditAct />} />
            <Route
              path="consulta-atos-concluidos"
              element={<CompletedActs />}
            />
            <Route path=":processId" element={<RegisterProcess />} />
            <Route
              path="atos-fisicos-concluidos"
              element={<AtosFisicosLazy />}
            />
            <Route path="processo-parte" element={<PartesDeProcessos />} />
            <Route
              path="adicionar-usuario-ao-processo-sigiloso/:idAto"
              element={<AdicionarUsuarioProcessoSigiloso />}
            />
          </Route>

          <Route path="contadoria" element={<PageBody />}>
            <Route path="calculos" element={<CalculosInicio />} />
            <Route path="calculos/:id" element={<Calculation />} />
            {/* <Route path="calculos/:id" element={<Calculation />} /> */}
            {/* <Route path="dados-calc/:id/:idCalc" element={<DadosCalcLazy />} /> */}
            {/* <Route
              path="calculos/base-de-calculo/:id"
              element={<BaseDeCalculo />}
            />
            <Route
              path="calculos/planilha-de-calculo/:id"
              element={<PlanilhaDeCalculo />}
            />
            <Route
              path="calculos/resultado-do-calculo/:id"
              element={<ResultadoDoCalculo />}
            /> */}
            <Route
              path="calculos-consultas"
              element={<ConsultCalculations />}
            />
            <Route path="ergon-rubricas" element={<ErgonRubricas />} />
            <Route path="impostos-rendas" element={<IncomeTaxTable />} />
            <Route path="indice" element={<Indices />} />
            <Route
              path="dcje-distribuicoes-pendentes"
              element={<ProceduralFilesDistribution />}
            />
            <Route
              path="dcje-ficha-processual"
              element={<ProceduralForwarding />}
            />
            <Route
              path="dcje-fichas-encerradas"
              element={<RecordClosedProceedings />}
            />
            <Route
              path="dcje-redistribuicoes-fichas"
              element={<RedistributionOfCaseFiles />}
            />
            <Route path="razoes-pedidos" element={<RequestReasons />} />
            <Route
              path="dcje-resposta-ficha-processual"
              element={<ResponseOfProcessForms />}
            />
            <Route
              path="dcje-resposta/:id"
              element={<ProceduralForwardingResponse />}
            />
            {/* <Route
              path="dcje-resposta-contador/:id"
              element={<RespostaContador />}
            /> */}
            <Route path="motivos-devolucao" element={<ReturnReasons />} />
            <Route path="sip-rubricas" element={<Rubricas />} />
            <Route path="indices" element={<Indices />} />
            <Route path="ergon-financeiro" element={<Ergon />} />
          </Route>

          <Route path="gerenciamento" element={<PageBody />}>
            <Route path="patrimonios" element={<PatrimoniosLazy />} />
            <Route
              path="edit-patrimonios/:idPatrimonio"
              element={<EditPatrimoniosLazy />}
            />
            <Route
              path="create-patrimonios"
              element={<CreatePatrimoniosLazy />}
            />
            <Route path="assessores" element={<AttorneyAdvisors />} />
            <Route path="despachos" element={<AttorneyDispatch />} />
            <Route path="credenciais" element={<CredenciaisPje />} />
            <Route path="procurador" element={<Attorney />} />
            <Route path="contador" element={<Accountant />} />
            <Route path="operador" element={<Operator />} />
            <Route path="rpv" element={<RPV />} />
            <Route
              path="requisitorios/:idAto"
              element={<CadastroRequisitorios />}
            />
            {/* <Route
              path="requisitorios/:process_id"
              element={<RequisitoriosLazy />}
            /> */}
            <Route path="procurador-geral" element={<AttorneyGeneral />} />
          </Route>

          <Route path="detalhes-processo" element={<PageBody />}>
            <Route
              path="extrato-de-processos-por-parte/:process_id"
              element={<ProcessExtractByParty />}
            />
            <Route
              path="espelho-processos/:process_id"
              element={<ProcessOverview />}
            />
            <Route path="visualizar-ato/:act_id" element={<ActDetailsView />} />
          </Route>

          <Route path="relatorios" element={<PageBody />}>
            <Route path="rel-distribuicoes" element={<DistributionsReport />} />
            <Route
              path="rel-produtividade-procuradores"
              element={<AttorneyProductivity />}
            />
            <Route
              path="rel-produtividade-operadores"
              element={<OperatorProductivity />}
            />
            <Route
              path="rel-distribuicoes-quantitativo"
              element={<DistributionsAmount />}
            />
            <Route path="rel-distribuicao-doe" element={<DoeDistributions />} />
            <Route
              path="rel-produtividade-assessor"
              element={<AdvisorProductivity />}
            />
            <Route path="rel-processos" element={<Cases />} />
            <Route path="rel-auditoria" element={<Audit />} />
            <Route path="rel-produtividade-rpv" element={<RpvProductivity />} />
            <Route path="rel-pecas-finalizadas" element={<FinishedPieces />} />
            <Route path="relatorio-rpv" element={<PaymentRequirements />} />
            <Route
              path="rel-quantitativo-pecas-finalizadas"
              element={<QuantityFinishedPieces />}
            />
            <Route
              path="rel-distribuicoes-pendentes"
              element={<PendingDistributions />}
            />
            <Route
              path="rel-quantitativo-vencimento"
              element={<ProcessesQuantityByDeadline />}
            />
          </Route>

          <Route path="relatorios-contadoria" element={<PageBody />}>
            <Route path="distribuicoes" element={<Distributions />} />
            <Route path="gerenciais" element={<Management />} />
            <Route
              path="rel-fichas-nao-encerradas-dcje"
              element={<ProceduralSheedNotClosed />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                profileIds={[PROFILES.PROCURADOR, PROFILES.ANALISTA]}
              />
            }
          >
            <Route path="bi" element={<PageBody />}>
              <Route path="agenda" element={<ScheduledHearings />} />
              <Route path="atos" element={<FlowAct />} />
              <Route path="atos-relatorios" element={<FlowActReports />} />
              <Route
                path="rel-quantitativo-processos-prazo"
                element={<ProcessesQuantityByDeadlineBI />}
              />
            </Route>
          </Route>

          <Route path="ajuda" element={<PageBody />}>
            <Route path="" element={<Help />} />
          </Route>

          <Route path="dcje" element={<PageBody />}>
            <Route
              path="ficha-processual/:actId"
              element={<ProceduralRecord />}
            />
            <Route
              path="ficha-processual-pendente/:id"
              element={<ProceduralDistributionRecord />}
            />
            <Route
              path="ficha-processual-redistribuicao/:id"
              element={<ProceduralRedistriutionRecord />}
            />
            <Route
              path="ficha-processual-encerrada/:id"
              element={<ProceduralClosedRecord />}
            />
          </Route>
        </Route>
      </Route>
      {/* revisar isso */}
      <Route path="*" element={<NotFound />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
    </Routes>
  </Suspense>
);
