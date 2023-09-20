import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';
import '@material/web/tabs/secondary-tab.js';

export default function Home() {
  return (
    <>
      <header className="nav | wrapper | bg-surface-container-low clr-on-surface">
        Nibble
      </header>
      <main className="main  | clr-on-surface">
        <aside className="sidebar | bg-surface-container">
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
          <div className="panel action-panel | bg-surface-container">Input</div>
          <div className="panels">
            <div className="panel | bg-surface-container">
              <md-tabs>
                <md-primary-tab>Video</md-primary-tab>
                <md-primary-tab>Photos</md-primary-tab>
                <md-primary-tab>Audio</md-primary-tab>
              </md-tabs>

              <md-tabs>
                <md-secondary-tab>Birds</md-secondary-tab>
                <md-secondary-tab>Cats</md-secondary-tab>
                <md-secondary-tab>Dogs</md-secondary-tab>
              </md-tabs>
            </div>
            <div className="panel | bg-surface-container">
              <md-tabs>
                <md-primary-tab>Video</md-primary-tab>
                <md-primary-tab>Photos</md-primary-tab>
                <md-primary-tab>Audio</md-primary-tab>
              </md-tabs>

              <md-tabs>
                <md-secondary-tab>Birds</md-secondary-tab>
                <md-secondary-tab>Cats</md-secondary-tab>
                <md-secondary-tab>Dogs</md-secondary-tab>
              </md-tabs>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
