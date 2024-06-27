import { getData, save, remove, getDocumento, update } from "./firestore.js"
let id = 0

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const jugador = {
            nick: document.getElementById('nick').value,
            fecha: document.getElementById('fecha').value,
            punt: document.getElementById('punt').value,
            tiempo: document.getElementById('tiempo').value,
            juego: document.getElementById('juego').value,
            dif: document.getElementById('dif').value,
            clasi: document.getElementById('clasi').value,
        }

        const nickExists = await checkNickExists(jugador.nick);
        if (nickExists) {
            alert('El nick ya está en uso, por favor elige otro.')}
        else {

            if (document.getElementById('btnGuardar').value == 'Guardar') {
                save(jugador)
            } 
            else {
                update(id, jugador)
                id = 0
            }    
            limpiar()
        }
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    getData(async (datos) => {
        let tabla = ''

        datos.forEach((doc) => {

            const item = doc.data()
            tabla += `<tr>
            <td>${item.nick}</td>
            <td>${item.fecha}</td>
            <td>${item.punt}</td>
            <td>${item.tiempo}</td>
            <td>${item.juego}</td>
            <td>${item.dif}</td>
            <td>${item.clasi}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla

        document.querySelectorAll('.btn-danger').forEach(btn => {

            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {

                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        document.querySelectorAll('.btn-warning').forEach(btn => {

            btn.addEventListener('click', async () => {

                const clasificacion = await getDocumento(btn.id)

                const c = clasificacion.data()

                document.getElementById('nick').value = c.nick
                document.getElementById('fecha').value = c.fecha
                document.getElementById('punt').value = c.punt
                document.getElementById('tiempo').value = c.tiempo
                document.getElementById('juego').value = c.juego
                document.getElementById('dif').value = c.dif
                document.getElementById('clasi').value = c.clasi

                document.getElementById('btnGuardar').value = 'Editar'

                document.getElementById('nick').readOnly = true

                id = clasificacion.id
            })
        })
    })
})