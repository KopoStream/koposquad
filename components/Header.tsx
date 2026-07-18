export default function Hero() {
  return (
    <section
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "90px",
            color: "#a855f7",
            marginBottom: "20px",
          }}
        >
          KOPOSQUAD
        </h1>

        <p
          style={{
            fontSize: "28px",
            marginBottom: "40px",
          }}
        >
          Suomen kasvava striimaajayhteisö
        </p>

        <button
          style={{
            background: "#a855f7",
            color: "white",
            border: "none",
            padding: "18px 45px",
            fontSize: "18px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Liity mukaan
        </button>
      </div>
    </section>
  );
}