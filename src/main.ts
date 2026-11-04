import './style.css'
import type { Categoria, Despesa } from './types'

const categorias: Categoria[] = ['Alimentos', 'Transporte', 'Lazer', 'Saúde', 'Outros']

const despesas: Despesa[] = []

const formulario = document.querySelector<HTMLFormElement>('#form-despesa')
const inputTitulo = document.querySelector<HTMLInputElement>('#titulo')
const inputValor = document.querySelector<HTMLInputElement>('#valor')
const selectCategoria = document.querySelector<HTMLSelectElement>('#categoria')
const mensagemFeedback = document.querySelector<HTMLParagraphElement>('#mensagem-feedback')
const listaDespesas = document.querySelector<HTMLUListElement>('#lista-despesas')
const estadoVazio = document.querySelector<HTMLDivElement>('#estado-vazio')
const totalGeral = document.querySelector<HTMLElement>('#total-geral')

const totaisPorCategoria: Record<Categoria, HTMLElement> = {
  Alimentos: document.querySelector<HTMLElement>('[data-categoria="Alimentos"]')!,
  Transporte: document.querySelector<HTMLElement>('[data-categoria="Transporte"]')!,
  Lazer: document.querySelector<HTMLElement>('[data-categoria="Lazer"]')!,
  Saúde: document.querySelector<HTMLElement>('[data-categoria="Saúde"]')!,
  Outros: document.querySelector<HTMLElement>('[data-categoria="Outros"]')!,
}

function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function gerarIdDespesa(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `despesa-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function definirFeedback(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'info'): void {
  if (!mensagemFeedback) {
    return
  }

  mensagemFeedback.textContent = mensagem
  mensagemFeedback.classList.remove('sucesso', 'erro', 'info')

  if (mensagem) {
    mensagemFeedback.classList.add(tipo)
  }
}

function validarFormulario(titulo: string, valorTexto: string, categoria: string): string[] {
  const erros: string[] = []

  if (!titulo.trim()) {
    erros.push('O título é obrigatório e não pode conter apenas espaços.')
  }

  const valorNumerico = Number.parseFloat(valorTexto.replace(',', '.'))

  if (!valorTexto.trim()) {
    erros.push('O valor é obrigatório.')
  } else if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
    erros.push('O valor deve ser numérico, finito e maior que zero.')
  }

  if (!categorias.includes(categoria as Categoria)) {
    erros.push('Selecione uma categoria válida.')
  }

  return erros
}

function atualizarTotais(): void {
  const total = despesas.reduce((soma, despesa) => soma + despesa.valor, 0)

  if (totalGeral) {
    totalGeral.textContent = formatarMoeda(total)
  }

  for (const categoria of categorias) {
    const totalCategoria = despesas
      .filter((despesa) => despesa.categoria === categoria)
      .reduce((soma, despesa) => soma + despesa.valor, 0)

    const elemento = totaisPorCategoria[categoria]
    if (elemento) {
      elemento.textContent = formatarMoeda(totalCategoria)
    }
  }
}

function renderizarLista(): void {
  if (!listaDespesas) {
    return
  }

  listaDespesas.replaceChildren()
  if (estadoVazio) {
    estadoVazio.hidden = despesas.length > 0
  }

  if (despesas.length === 0) {
    return
  }

  for (const despesa of despesas) {
    const item = document.createElement('li')
    item.className = 'despesa-item'

    const info = document.createElement('div')
    info.className = 'despesa-info'

    const titulo = document.createElement('p')
    titulo.className = 'despesa-titulo'
    titulo.textContent = despesa.titulo

    const categoria = document.createElement('span')
    categoria.className = 'despesa-categoria'
    categoria.textContent = despesa.categoria

    const valor = document.createElement('strong')
    valor.className = 'despesa-valor'
    valor.textContent = formatarMoeda(despesa.valor)

    info.append(titulo, categoria)
    item.append(info, valor)
    listaDespesas.appendChild(item)
  }
}

function atualizarInterface(): void {
  atualizarTotais()
  renderizarLista()
}

function limparFormulario(): void {
  if (inputTitulo) {
    inputTitulo.value = ''
  }

  if (inputValor) {
    inputValor.value = ''
  }

  if (selectCategoria) {
    selectCategoria.value = 'Alimentos'
  }
}

if (formulario) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    if (!inputTitulo || !inputValor || !selectCategoria) {
      return
    }

    const titulo = inputTitulo.value.trim()
    const valorTexto = inputValor.value.trim()
    const categoria = selectCategoria.value

    const erros = validarFormulario(titulo, valorTexto, categoria)

    if (erros.length > 0) {
      definirFeedback(erros[0], 'erro')
      return
    }

    const novaDespesa: Despesa = {
      id: gerarIdDespesa(),
      titulo,
      valor: Number.parseFloat(valorTexto.replace(',', '.')),
      categoria: categoria as Categoria,
    }

    despesas.push(novaDespesa)
    limparFormulario()
    definirFeedback(`Despesa "${novaDespesa.titulo}" adicionada com sucesso.`, 'sucesso')
    atualizarInterface()
  })
}

atualizarInterface()
definirFeedback('', 'info')
