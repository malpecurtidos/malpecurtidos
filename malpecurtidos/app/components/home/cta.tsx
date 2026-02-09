import { Button } from "~/ui/button";

export function Cta() {
  const highlights = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4L12 14.01L9 11.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Eco-Friendly",
      description:
        "Conciencia ecológica. Productos bajos en plomo y procesos sustentables.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M4 21V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 21V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 12V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 14H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 8H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 16H23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Pieles Personalizadas",
      description:
        "Desarrollamos pieles a tu medida, color y textura específica.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M12 2L2 19H22L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9V13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17H12.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Tecnología de Punta",
      description:
        "Que nos permite brindarte la mejor calidad y consistencia.",
    },
  ];

  return (
    <section className="bg-[#F9F7F2] py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[85%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Contar con pieles desarrolladas en Malpe, simplemente{" "}
              <span className="text-[#8B5A2B]">marca la diferencia.</span>
            </h2>

            <div className="space-y-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8B5A2B]/10 flex items-center justify-center text-[#8B5A2B]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              className="tracking-wider text-sm"
            >
              Solicitar Muestras
            </Button>
          </div>

          {/* Right Content - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4 translate-y-8">
              <div className="w-full h-64 rounded-lg shadow-md overflow-hidden">
                <img
                  src="/home-imgs/cta-grid/cta-grid-1.webp"
                  alt="Malpe leather product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-64 rounded-lg shadow-md overflow-hidden">
                <img
                  src="/home-imgs/cta-grid/cta-grid-2.webp"
                  alt="Malpe leather product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <div className="w-full h-64 rounded-lg shadow-md overflow-hidden">
                <img
                  src="/home-imgs/cta-grid/cta-grid-3.webp"
                  alt="Malpe leather product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-64 rounded-lg shadow-md overflow-hidden">
                <img
                  src="/home-imgs/cta-grid/cta-grid-4.webp"
                  alt="Malpe leather product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
