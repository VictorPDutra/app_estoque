import React, { useRef, useState, useEffect } from "react";
import styles from "./Home.module.css";
import HomeStock from "../../assets/homestock.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const carouselRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollButtons = () => {
    const container = carouselRef.current;
    if (container) {
      // Verifica se pode rolar para a esquerda
      setShowLeftButton(container.scrollLeft > 0);

      // Verifica se pode rolar para a direita
      const maxScroll = container.scrollWidth - container.clientWidth;
      setShowRightButton(container.scrollLeft < maxScroll - 1); // -1 para compensar arredondamentos
    }
  };

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (container) {
      // Largura do card (300px) + gap entre cards (20px)
      const cardWidth = 300;
      const cardGap = 20;
      const scrollAmount = cardWidth + cardGap;

      container.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });

      // Atualiza os botões após a rolagem
      setTimeout(checkScrollButtons, 500);
    }
  };

  // Verifica os botões quando o componente monta e quando o tamanho da janela muda
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  // Adiciona o listener de scroll
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      const handleScroll = () => {
        requestAnimationFrame(checkScrollButtons);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const cards = [
    {
      title: "Gestão de Produtos",
      description:
        "Cadastre e gerencie seus produtos de forma simples e organizada, com controle de estoque em tempo real.",
    },
    {
      title: "Controle de Estoque",
      description:
        "Acompanhe entradas, saídas e movimentações do seu estoque com relatórios detalhados.",
    },
    {
      title: "Análise de Dados",
      description:
        "Visualize métricas importantes e tome decisões baseadas em dados concretos sobre seu estoque.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left_content}>
        <div className={styles.home}>
          <div>
            <p className={styles.home_description}>
              Bem vindo ao <span className={styles.logo}>STOCKS</span>!
            </p>
            <p className={styles.home_description}>
              Gerencie seu estoque de forma simples e eficiente
            </p>
          </div>
        </div>
        <div className={styles.carousel_container}>
          <div className={styles.carousel_box}>
            {showLeftButton && (
              <button
                className={`${styles.carousel_button} ${styles.prev}`}
                onClick={() => scroll(-1)}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <div className={styles.carousel} ref={carouselRef}>
              {cards.map((card, index) => (
                <div key={index} className={styles.card}>
                  <h3 className={styles.card_title}>{card.title}</h3>
                  <p className={styles.card_description}>{card.description}</p>
                </div>
              ))}
            </div>
            {showRightButton && (
              <button
                className={`${styles.carousel_button} ${styles.next}`}
                onClick={() => scroll(1)}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.image_container}>
        <img
          src={HomeStock}
          alt="Ilustração de gestão de estoque"
          className={styles.image_home}
        />
      </div>
    </div>
  );
};

export default Home;
