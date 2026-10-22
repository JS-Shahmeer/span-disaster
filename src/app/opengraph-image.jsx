import { ImageResponse } from "next/og";

export const alt = "SPAN Disaster Services: Your Neighbors. Your Preparedness. Your First Response.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#17334f",
          color: "#f8f7f2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: "#28674b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, fontWeight: 700 }}>+</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700 }}>SPAN</div>
            <div style={{ fontSize: 20, letterSpacing: 4, opacity: 0.7 }}>DISASTER SERVICES</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>Your Neighbors May Be Your First Responders.</div>
          <div style={{ fontSize: 28, opacity: 0.75 }}>Neighborhood preparedness for the critical first hour after a disaster.</div>
        </div>
        <div style={{ height: 6, width: 240, background: "#e6b55c" }} />
      </div>
    ),
    size
  );
}
