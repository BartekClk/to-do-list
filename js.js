function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

var to_dos = [];
var to_local = [];
const to_do = document.querySelector("#to_do");

if (localStorage.getItem("tasks") !== null) {
    let a = JSON.parse(localStorage.getItem("tasks"));
    console.log(a)
    for (const el of a) {
        add_el(el.value, el.done);
    }
}

const normal_button = document.querySelector("#normal");
normal_button.addEventListener("click", () => { add_el(document.querySelector("#input_text").value) })

function add_el(value, checked) {
    const trash = document.createElement("img");
    trash.src = "trash.svg";
    trash.classList.add("trash");

    const done = document.createElement("img");
    done.src = "done.svg";
    done.classList.add("done")

    done.addEventListener('click', () => {
        if (!done.hasAttribute("done")) {
            done.parentElement.style.backgroundColor = "#198754";
            done.src = "x.svg";
            done.setAttribute("done", "");
            to_local[parseInt(done.parentElement.parentElement.firstChild.innerHTML) - 1].done = true;
            localStorage.removeItem("tasks");
            localStorage.setItem("tasks", JSON.stringify(to_local));
        } else if (done.hasAttribute("done")) {
            done.parentElement.style.backgroundColor = "white";
            done.src = "done.svg";
            done.removeAttribute("done");
            to_local[parseInt(done.parentElement.parentElement.firstChild.innerHTML) - 1].done = false;
            localStorage.removeItem("tasks");
            localStorage.setItem("tasks", JSON.stringify(to_local));
        }
    })

    trash.addEventListener('click', () => {
        for (var i = 0; i < to_dos.length; i++) {
            if (to_dos[i] == trash.parentElement.parentElement) {
                to_dos.splice(i, 1);
                clear_all();
                add_all();
            }
        }
        if (to_dos.length == 0) {
            clear_all();
        }
    })


    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.setAttribute("scope", "row");

    var td = document.createElement("td");

    e = document.createElement("e");
    e.innerHTML = value;

    td.appendChild(e);

    td.appendChild(trash);
    td.appendChild(done);

    tr.appendChild(th);
    tr.appendChild(td);

    to_dos.push(tr);

    clear_all();

    add_all();

    if (checked == true) {
        done.parentElement.style.backgroundColor = "#198754";
        done.src = "x.svg";
        done.setAttribute("done", "");
    }
}

const clear = document.querySelector("#clear_");
clear.addEventListener('click', () => {
    clear_all();
    to_dos = [];
    to_local = [];
})

function clear_all() {
    const a = document.querySelectorAll("tr");
    for (const el of a) {
        el.parentElement.removeChild(el);
    }
    localStorage.removeItem("tasks");
}

function add_all() {
    to_local = [];
    for (const el of to_dos) {
        to_do.appendChild(el);
        el.firstChild.innerHTML = el.rowIndex + 1;
        let a = {
            value: el.querySelector("e").innerHTML,
            done: el.lastChild.lastChild.hasAttribute("done")
        }
        to_local.push(a);
    }
    localStorage.setItem("tasks", JSON.stringify(to_local));
}