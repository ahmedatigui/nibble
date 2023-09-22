"use client";

import { Input, Button } from "@mui/material-next";

const HTTP_verbs = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];

export default function Home() {
  return (
    <>
      <header className="nav | wrapper | bg-surface-container-low clr-on-surface">
        Nibble
      </header>
      <main className="main  | clr-on-surface">
        <aside className="sidebar | bg-surface-container large-rounding">
          <ul>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
            <li>4.</li>
          </ul>
          <ul>
            <li>A.</li>
            <li>B.</li>
            <li>C.</li>
            <li>D.</li>
          </ul>
        </aside>
        <section className="">
          <div className="panel action-panel | bg-surface-container large-rounding">
            <Input />
            <Button className="button">Send</Button>
          </div>
          <div className="panels">
            <div className="panel | bg-surface-container large-rounding">
              Resuest Panel
            </div>
            <div className="panel | bg-surface-container large-rounding">
              Response Panel
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
