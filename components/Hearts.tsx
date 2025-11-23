"use client";
export default function Hearts() {
  return (
    <div className="pointer-events-none hearts-wrapper fixed inset-0 -z-10">
      <span className="heart h1" />
      <span className="heart h2" />
      <span className="heart h3" />
      <span className="heart h4" />
    </div>
  );
}
