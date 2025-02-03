export default function ArchiveoiLayout({ children, archive, latest }) {
    return (
        <div>
            <h1>ArPIOPOiosů</h1>
            <section id="archive-filter">{archive}</section>
            <section id="archive-latest"> {latest}</section>
            <section id="archive-latest"> {children}</section>
        </div>
    );
}