'use client';

import UseSelect from '../Components/Select';
import { Button, InputBase, Tabs, Tab, TabScrollButton } from '@mui/material-next';
import Send from '@mui/icons-material/Send';

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
        <section>
          <div className="panel action-panel | bg-surface-container large-rounding padding-2">
            <div className="input-container | bg-surface-container-high">
              {UseSelect()}
              <InputBase
                className="input"
                placeholder="https://www.page.com/api/"
              />
              <Button className="button">
                <Send />
              </Button>
            </div>
            <div className="status">
              <span>200 OK</span>
              <span>75ms</span>
              <span>2.14kb</span>
            </div>
          </div>
          <div className="panels">
            <div className="panel | bg-surface-container large-rounding">
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
