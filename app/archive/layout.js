export default function ArchiveLayout({ archive, latest }) {
    return (
        <div>
            <h1>Všechny kurzy</h1>
            <section id="archive-filter">{archive}</section>
            <section id="archive-latest"> {latest}</section>
            {/* <section id="archive-latest"> {children}</section> */}
        </div>
    );
}