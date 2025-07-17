const form = document.getElementById('agendamentoForm');
const dataInput = document.getElementById('data');
const horaInput = document.getElementById('hora');
const caoInput = document.getElementById('cao');
const donoInput = document.getElementById('dono');
const servicoInput = document.getElementById('servico');
const filtroData = document.getElementById('filtroData');
const btnFiltrar = document.getElementById('btnFiltrar');

let agendamentos = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = dataInput.value;
  const hora = horaInput.value;
  const cao = caoInput.value;
  const dono = donoInput.value;
  const servico = servicoInput.value;

  if (!data || !hora || !cao || !dono || !servico) return;

  agendamentos.push({ data, hora, cao, dono, servico });

  form.reset();
  render();
});

btnFiltrar.addEventListener('click', render);

function render() {
  const manha = document.getElementById('manha');
  const tarde = document.getElementById('tarde');
  const noite = document.getElementById('noite');

  manha.innerHTML = '';
  tarde.innerHTML = '';
  noite.innerHTML = '';

  const filtro = filtroData.value;

  agendamentos
    .filter(a => !filtro || a.data === filtro)
    .forEach((a, index) => {
      const hora = parseInt(a.hora.split(':')[0]);
      let periodo;
      if (hora >= 5 && hora < 12) periodo = manha;
      else if (hora >= 12 && hora < 18) periodo = tarde;
      else periodo = noite;

      const li = document.createElement('li');
      li.innerHTML = `<span>${a.hora}  ${a.cao} / ${a.dono}<br>${a.servico}</span>`;

      const btn = document.createElement('button');
      btn.textContent = 'Excluir';
      btn.onclick = () => {
        agendamentos.splice(index, 1);
        render();
      };

      li.appendChild(btn);
      periodo.appendChild(li);
    });
}

render();