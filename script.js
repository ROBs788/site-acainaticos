document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ENVIO DO FORMULÁRIO B2B PARA O WHATSAPP ---
    const b2bForm = document.getElementById("b2bForm");

    if (b2bForm) {
        b2bForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            // Captura os valores digitados nos campos
            const nome = document.getElementById("fullName").value.trim();
            const empresa = document.getElementById("companyName").value.trim();
            const whatsappCliente = document.getElementById("whatsapp").value.trim();
            const cidade = document.getElementById("city").value.trim();
            const statusNegocio = document.getElementById("businessStatus").value;

            // Configuração do WhatsApp de destino (Açaináticos Distribuidora)
            const numeroDestino = "558597890037"; 

            // Montagem da mensagem formatada para o atendente
            const mensagem = `Olá! Solicitei o catálogo de preços pelo site. Seguem meus dados:\n\n` +
                             `*Nome:* ${nome}\n` +
                             `*Empresa:* ${empresa}\n` +
                             `*WhatsApp:* ${whatsappCliente}\n` +
                             `*Cidade:* ${cidade}\n` +
                             `*Situação:* ${statusNegocio}`;

            // Codifica o texto para o padrão de URL
            const mensagemCodificada = encodeURIComponent(mensagem);

            // Cria o link da API do WhatsApp
            const urlWhatsApp = `https://wa.me{numeroDestino}?text=${mensagemCodificada}`;

            // Abre o WhatsApp em uma nova aba
            window.open(urlWhatsApp, "_blank");
            
            // Opcional: Limpa o formulário após o envio
            b2bForm.reset();
        });
    }

    // --- 2. ANIMAÇÃO FADE-IN COM INTERSECTION OBSERVER ---
    const fadeElements = document.querySelectorAll(".fade-in");

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        appearanceObserver.observe(element);
    });

    // --- 3. ROLAGEM SUAVE DO MENU DE NAVEGAÇÃO ---
    const menuLinks = document.querySelectorAll('a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            
            // Só aplica a rolagem se o link apontar para um ID válido na página
            if (targetId.startsWith("#") && targetId.length > 1) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
});
