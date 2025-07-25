$(document).ready(function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    $('body').addClass('loaded');
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Imagem %1 de %2',
        'fadeDuration': 300,
        'imageFadeDuration': 300
    });
    let lastScrollTop = 0;
    const $welcomeSection = $('#welcome-section');
    const welcomeSectionHeight = $welcomeSection.outerHeight();
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        if (scrollTop > 100) {
            $welcomeSection.addClass('hidden');
        } else {
            $welcomeSection.removeClass('hidden');
        }
        lastScrollTop = scrollTop;
    });
    function animateProducts() {
        $('.produto-item').each(function(index) {
            const $this = $(this);
            setTimeout(function() {
                $this.css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, index * 100);
        });
    }
    function checkProductsVisibility() {
        const $produtos = $('#produtos');
        if ($produtos.length) {
            const elementTop = $produtos.offset().top;
            const elementBottom = elementTop + $produtos.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                animateProducts();
                $(window).off('scroll', checkProductsVisibility);
            }
        }
    }
    $(window).on('scroll', checkProductsVisibility);
    checkProductsVisibility();
    $('#loadMoreNews').on('click', function() {
        const $button = $(this);
        const originalText = $button.text();
        $button.addClass('loading').prop('disabled', true);
        setTimeout(function() {
            const additionalNews = [
                {
                    image: 'img/tijoloAparenteRustico.webp',
                    date: '10 de Dezembro, 2024',
                    category: 'Materiais',
                    title: 'Tijolo Aparente: Charme Rústico',
                    description: 'O tijolo aparente continua sendo uma escolha popular para projetos que buscam autenticidade e charme rústico.',
                    delay: 200
                },
                {
                    image: 'img/soleiraBege.webp',
                    date: '05 de Dezembro, 2024',
                    category: 'Acabamentos',
                    title: 'Soleiras: Detalhes que Fazem a Diferença',
                    description: 'Pequenos detalhes como soleiras bem escolhidas podem transformar completamente um ambiente.',
                    delay: 300
                },
                {
                    image: 'img/rodapeCeramico.webp',
                    date: '01 de Dezembro, 2024',
                    category: 'Acabamentos',
                    title: 'Rodapés Cerâmicos: Acabamento Perfeito',
                    description: 'Conheça as vantagens dos rodapés cerâmicos e como eles proporcionam um acabamento impecável.',
                    delay: 400
                }
            ];
            const $newsGrid = $('.news-grid');
            additionalNews.forEach(function(news) {
                const newsCard = `
                    <article class="news-card" data-aos="fade-up" data-aos-delay="${news.delay}">
                        <div class="news-image">
                            <img src="${news.image}" alt="${news.title}">
                        </div>
                        <div class="news-content">
                            <div class="news-meta">
                                <span class="news-date">${news.date}</span>
                                <span class="news-category">${news.category}</span>
                            </div>
                            <h3>${news.title}</h3>
                            <p>${news.description}</p>
                            <a href="#" class="read-more">Leia mais</a>
                        </div>
                    </article>
                `;
                $newsGrid.append(newsCard);
            });
            AOS.refresh();
            $button.removeClass('loading').prop('disabled', false);
            $button.text('Todas os destaques carregados');
            setTimeout(function() {
                $button.prop('disabled', true).css('opacity', '0.6');
            }, 1000);
        }, 2000);
    });
    $('.news-card').on('mouseenter', function() {
        $(this).find('.news-image img').css('transform', 'scale(1.05)');
    }).on('mouseleave', function() {
        $(this).find('.news-image img').css('transform', 'scale(1)');
    });
    $('.read-more').on('click', function(e) {
        e.preventDefault();
        const $card = $(this).closest('.news-card');
        const title = $card.find('h3').text();
        const description = $card.find('p').text();
        const category = $card.find('.news-category').text();
        const date = $card.find('.news-date').text();
        const image = $card.find('.news-image img').attr('src');
        let technicalContent = '';
        let specifications = '';
        if (title.includes('Porcelanato Técnico')) {
            technicalContent = `
                <h3>Especificações Técnicas</h3>
                <div class="tech-specs">
                    <div class="spec-item">
                        <strong>Absorção de Água:</strong> ≤ 0,5% (Grupo BIa)
                    </div>
                    <div class="spec-item">
                        <strong>Resistência à Flexão:</strong> ≥ 35 MPa
                    </div>
                    <div class="spec-item">
                        <strong>Resistência ao Desgaste:</strong> PEI 5 (Tráfego Intenso)
                    </div>
                    <div class="spec-item">
                        <strong>Dimensões:</strong> 60x60cm, 80x80cm, 120x60cm
                    </div>
                    <div class="spec-item">
                        <strong>Espessura:</strong> 10mm
                    </div>
                    <div class="spec-item">
                        <strong>Acabamento:</strong> Natural, Polido, Acetinado
                    </div>
                </div>
                <h3>Aplicações Recomendadas</h3>
                <ul class="applications">
                    <li>Áreas comerciais de alto tráfego</li>
                    <li>Hospitais e clínicas</li>
                    <li>Aeroportos e shopping centers</li>
                    <li>Indústrias alimentícias</li>
                    <li>Fachadas ventiladas</li>
                </ul>
            `;
        } else if (title.includes('Ladrilhos Hidráulicos')) {
            technicalContent = `
                <h3>Especificações Técnicas</h3>
                <div class="tech-specs">
                    <div class="spec-item">
                        <strong>Absorção de Água:</strong> 6% a 10% (Grupo BIIb)
                    </div>
                    <div class="spec-item">
                        <strong>Resistência à Flexão:</strong> ≥ 18 MPa
                    </div>
                    <div class="spec-item">
                        <strong>Resistência ao Desgaste:</strong> PEI 3-4
                    </div>
                    <div class="spec-item">
                        <strong>Dimensões:</strong> 20x20cm, 25x25cm
                    </div>
                    <div class="spec-item">
                        <strong>Espessura:</strong> 20mm
                    </div>
                    <div class="spec-item">
                        <strong>Processo:</strong> Prensagem hidráulica
                    </div>
                </div>
                <h3>Características Especiais</h3>
                <ul class="applications">
                    <li>Desenhos exclusivos e personalizados</li>
                    <li>Produção artesanal</li>
                    <li>Resistente a manchas</li>
                    <li>Ideal para ambientes internos</li>
                    <li>Fácil manutenção</li>
                </ul>
            `;
        } else if (title.includes('Pisos Amadeirados')) {
            technicalContent = `
                <h3>Especificações Técnicas</h3>
                <div class="tech-specs">
                    <div class="spec-item">
                        <strong>Absorção de Água:</strong> 3% a 6% (Grupo BIIa)
                    </div>
                    <div class="spec-item">
                        <strong>Resistência à Flexão:</strong> ≥ 22 MPa
                    </div>
                    <div class="spec-item">
                        <strong>Resistência ao Desgaste:</strong> PEI 4
                    </div>
                    <div class="spec-item">
                        <strong>Dimensões:</strong> 15x90cm, 20x120cm
                    </div>
                    <div class="spec-item">
                        <strong>Espessura:</strong> 8,5mm
                    </div>
                    <div class="spec-item">
                        <strong>Acabamento:</strong> Acetinado com textura
                    </div>
                </div>
                <h3>Dicas de Instalação</h3>
                <ul class="applications">
                    <li>Use argamassa colante AC-II ou AC-III</li>
                    <li>Deixe junta de dilatação de 2-3mm</li>
                    <li>Instale no sentido da maior dimensão do ambiente</li>
                    <li>Faça rejunte após 24h da instalação</li>
                    <li>Use rejunte flexível para melhor resultado</li>
                </ul>
            `;
        } else if (title.includes('Sustentável')) {
            technicalContent = `
                <h3>Certificações Ambientais</h3>
                <div class="tech-specs">
                    <div class="spec-item">
                        <strong>ISO 14001:</strong> Sistema de Gestão Ambiental
                    </div>
                    <div class="spec-item">
                        <strong>LEED:</strong> Contribui para pontuação LEED
                    </div>
                    <div class="spec-item">
                        <strong>Reciclagem:</strong> 30% de material reciclado
                    </div>
                    <div class="spec-item">
                        <strong>Emissões:</strong> Baixa emissão de COV
                    </div>
                    <div class="spec-item">
                        <strong>Energia:</strong> Produção com energia renovável
                    </div>
                </div>
                <h3>Benefícios Ambientais</h3>
                <ul class="applications">
                    <li>Redução de 40% no consumo de água na produção</li>
                    <li>Reaproveitamento de 95% dos resíduos</li>
                    <li>Embalagens 100% recicláveis</li>
                    <li>Transporte otimizado para reduzir CO₂</li>
                    <li>Durabilidade superior reduz necessidade de troca</li>
                </ul>
            `;
        } else if (title.includes('Cobogós')) {
            technicalContent = `
                <h3>Especificações Técnicas</h3>
                <div class="tech-specs">
                    <div class="spec-item">
                        <strong>Absorção de Água:</strong> 8% a 15% (Grupo BIII)
                    </div>
                    <div class="spec-item">
                        <strong>Resistência à Compressão:</strong> ≥ 7 MPa
                    </div>
                    <div class="spec-item">
                        <strong>Dimensões:</strong> 19x19x7cm, 39x19x7cm
                    </div>
                    <div class="spec-item">
                        <strong>Peso:</strong> 2,5 kg/peça (19x19cm)
                    </div>
                    <div class="spec-item">
                        <strong>Área de Ventilação:</strong> 40% a 60%
                    </div>
                </div>
                <h3>Vantagens Arquitetônicas</h3>
                <ul class="applications">
                    <li>Ventilação natural eficiente</li>
                    <li>Controle de luminosidade</li>
                    <li>Privacidade visual</li>
                    <li>Elemento decorativo</li>
                    <li>Redução de temperatura interna</li>
                </ul>
            `;
        } else {
            technicalContent = `
                <h3>Informações Técnicas</h3>
                <div class="tech-specs">
                    <div class="spec-item">
                        <strong>Categoria:</strong> ${category}
                    </div>
                    <div class="spec-item">
                        <strong>Aplicação:</strong> Residencial e Comercial
                    </div>
                    <div class="spec-item">
                        <strong>Garantia:</strong> 5 anos contra defeitos de fabricação
                    </div>
                    <div class="spec-item">
                        <strong>Normas:</strong> ABNT NBR 13818
                    </div>
                </div>
                <h3>Características Gerais</h3>
                <ul class="applications">
                    <li>Alta qualidade e durabilidade</li>
                    <li>Fácil limpeza e manutenção</li>
                    <li>Resistente a manchas</li>
                    <li>Produto nacional</li>
                    <li>Disponível em várias cores</li>
                </ul>
            `;
        }
        const modalContent = `
            <div class="news-modal-overlay" id="newsModal">
                <div class="news-modal">
                    <div class="news-modal-header">
                        <button class="news-modal-close" id="closeModal">&times;</button>
                    </div>
                    <div class="news-modal-content">
                        <img src="${image}" alt="${title}" class="news-modal-image">
                        <div class="news-modal-meta">
                            <span class="news-modal-date">${date}</span>
                            <span class="news-modal-category">${category}</span>
                        </div>
                        <h2 class="news-modal-title">${title}</h2>
                        <div class="news-modal-text">
                            <p><strong>Resumo:</strong> ${description}</p>
                            <p>A ItaCeramica está sempre inovando e trazendo as melhores soluções em produtos cerâmicos para nossos clientes. Nossa equipe técnica trabalha constantemente no desenvolvimento de novos materiais que atendam às demandas do mercado.</p>
                            
                            ${technicalContent}
                            
                            <h3>Informações Comerciais</h3>
                            <div class="commercial-info">
                                <p><strong>Disponibilidade:</strong> Pronta entrega</p>
                                <p><strong>Prazo de Entrega:</strong> 5 a 10 dias úteis</p>
                                <p><strong>Condições de Pagamento:</strong> À vista ou parcelado</p>
                                <p><strong>Frete:</strong> Consulte nossa equipe comercial</p>
                            </div>
                            
                            <p>Para mais informações sobre este produto, especificações detalhadas ou para solicitar um orçamento personalizado, entre em contato conosco através do formulário na página ou pelos nossos canais de atendimento.</p>
                        </div>
                        <div class="news-modal-actions">
                            <button class="btn-contact" onclick="window.location.href='contato.html'">Solicitar Orçamento</button>
                            <button class="btn-close-modal" id="closeModalBtn">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modalContent);
        setTimeout(function() {
            $('#newsModal').addClass('active');
        }, 10);
        $('#closeModal, #closeModalBtn').on('click', function() {
            $('#newsModal').removeClass('active');
            setTimeout(function() {
                $('#newsModal').remove();
            }, 300);
        });
        $('#newsModal').on('click', function(e) {
            if (e.target === this) {
                $(this).removeClass('active');
                setTimeout(function() {
                    $('#newsModal').remove();
                }, 300);
            }
        });
        $(document).on('keydown.modal', function(e) {
            if (e.keyCode === 27) {
                $('#newsModal').removeClass('active');
                setTimeout(function() {
                    $('#newsModal').remove();
                    $(document).off('keydown.modal');
                }, 300);
            }
        });
    });
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    $.validator.addMethod("phoneFormat", function(value, element) {
        return this.optional(element) || /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value);
    }, "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX");
    $('#contact-form').validate({
        rules: {
            nome: {
                required: true,
                minlength: 3,
                maxlength: 100
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            },
            telefone: {
                required: true,
                phoneFormat: true
            },
            mensagem: {
                required: true,
                minlength: 10,
                maxlength: 1000
            }
        },
        messages: {
            nome: {
                required: "Por favor, informe seu nome completo",
                minlength: "O nome deve ter pelo menos 3 caracteres",
                maxlength: "O nome deve ter no máximo 100 caracteres"
            },
            email: {
                required: "Por favor, informe seu e-mail",
                email: "Por favor, informe um e-mail válido",
                maxlength: "O e-mail deve ter no máximo 100 caracteres"
            },
            telefone: {
                required: "Por favor, informe seu telefone"
            },
            mensagem: {
                required: "Por favor, escreva uma mensagem",
                minlength: "A mensagem deve ter pelo menos 10 caracteres",
                maxlength: "A mensagem deve ter no máximo 1000 caracteres"
            }
        },
        errorElement: 'span',
        errorClass: 'error-message',
        highlight: function(element) {
            $(element).addClass('error-field').removeClass('valid-field');
        },
        unhighlight: function(element) {
            $(element).removeClass('error-field').addClass('valid-field');
        },
        submitHandler: function(form) {
            const $submitBtn = $(form).find('.btn-submit');
            const originalText = $submitBtn.text();
            $submitBtn.addClass('loading').prop('disabled', true);
            setTimeout(function() {
                $(form).fadeOut(500, function() {
                    $('#form-success').fadeIn(500);
                    setTimeout(function() {
                        $('#form-success').fadeOut(500, function() {
                            form.reset();
                            $(form).find('.error-field, .valid-field').removeClass('error-field valid-field');
                            $submitBtn.removeClass('loading').prop('disabled', false).text(originalText);
                            $(form).fadeIn(500);
                        });
                    }, 5000);
                });
            }, 2000);
            return false;
        }
    });
    $('#telefone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            $(this).val(value);
        }
    });
    $('#mensagem').on('input', function() {
        const maxLength = 1000;
        const currentLength = $(this).val().length;
        const remaining = maxLength - currentLength;
        let $counter = $(this).siblings('.char-counter');
        if ($counter.length === 0) {
            $counter = $('<div class="char-counter" style="text-align: right; font-size: 0.9em; color: #666; margin-top: 5px;"></div>');
            $(this).after($counter);
        }
        $counter.text(`${currentLength}/${maxLength} caracteres`);
        if (remaining < 50) {
            $counter.css('color', '#dc3545');
        } else {
            $counter.css('color', '#666');
        }
    });
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.welcome-image');
        const speed = 0.5;
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });
    function animateOnScroll() {
        $('.fade-in-up').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();
    $('.news-card').attr('tabindex', '0').on('keypress', function(e) {
        if (e.which === 13) {
            $(this).find('.read-more')[0].click();
        }
    });
    $('a, button, input, select, textarea').on('focus', function() {
        $(this).addClass('focused');
    }).on('blur', function() {
        $(this).removeClass('focused');
    });
    console.log('ItaCeramica - Sistema inicializado com sucesso!');
    console.log('Componentes ativos: AOS, Lightbox2, jQuery Validation, Componente de Notícias');
});
function refreshAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}
window.refreshAnimations = refreshAnimations;