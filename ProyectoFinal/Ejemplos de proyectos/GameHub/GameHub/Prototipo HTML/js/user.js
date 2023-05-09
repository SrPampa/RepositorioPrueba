$("#user-interface").click(() => {
    let toggleWidth;
    if ($("#user-interface").width() == 50) {
        toggleWidth = 300;

        $('#user-interface').css({
            cursor: "default",
            borderTop: "2px solid rgba(255,255,255,0.5)",
            borderLeft: "2px solid rgba(255,255,255,0.5)"
        })

        $('#user-interface').animate({
            borderRadius: "5%",
            width: toggleWidth,
            height: toggleWidth
        });

        $('#user-img').animate({
            marginTop: "5px"
        });


        $('#user-content, #cerrar-interface').css({
            display: "block"
        });
        $('#user-content, #cerrar-interface').animate({
            opacity: 1
        });
        $("#cerrar-interface").addClass("abierto");
    }
});

$("#cerrar-interface").on("click", () => {
    if ($("#cerrar-interface").hasClass("abierto")) {

        toggleWidth = "50px"
        $('#user-interface').css({
            cursor: "pointer",
            border: "none"
        })
        $('#user-interface').animate({
            borderRadius: "50%",
            width: toggleWidth,
            height: toggleWidth,
        });

        $('#user-img').animate({
            marginTop: ""
        });


        $('#user-content, #cerrar-interface').animate({
            opacity: 0
        });
        setTimeout(() => { // esperamos a que se haga invisible para poder quitar display
            $('#user-content, #cerrar-interface').css({
                display: "none"
            });
        }, 500)

        $('#login-form,#register-form,#edit-form ').animate({
            opacity: 0
        });
        setTimeout(() => { // esperamos a que se haga invisible para poder quitar display
            $('#login-form,#register-form,#edit-form ').css({
                display: "none"
            });
        }, 500)
        
        $("#cerrar-interface").removeClass("abierto");
    }
});

$('#login').click(() => {
    $('#user-content').animate({
        opacity: 0
    });
    setTimeout(() => { // esperamos a que se haga invisible para poder quitar display
        $('#user-content').css({
            display: "none"
        });

        $('#login-form').css({
            display: "block"
        });
        $('#login-form').animate({
            opacity: 1
        });

    }, 500)
})

$('#register').click(() => {
    toggleWidth = 400;
    $('#user-interface').animate({
        borderRadius: "5%",
        width: toggleWidth,
        height: toggleWidth
    });

    $('#user-content').animate({
        opacity: 0
    });
    setTimeout(() => { // esperamos a que se haga invisible para poder quitar display
        $('#user-content').css({
            display: "none"
        });

        $('#register-form').css({
            display: "block"
        });
        $('#register-form').animate({
            opacity: 1
        });

    }, 500)
})

$('#editar-datos').click(() => {
    toggleWidth = 400;
    $('#user-interface').animate({
        borderRadius: "5%",
        width: toggleWidth,
        height: toggleWidth
    });

    $('#user-content').animate({
        opacity: 0
    });
    setTimeout(() => { // esperamos a que se haga invisible para poder quitar display
        $('#user-content').css({
            display: "none"
        });

        $('#edit-form').css({
            display: "block"
        });
        $('#edit-form').animate({
            opacity: 1
        });

    }, 500)
})