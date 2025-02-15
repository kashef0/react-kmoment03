import './Footer.css'

const Footer = () => {

    const date = new Date().getFullYear();
    
  return (
    <footer className="footer">
  <p>© {date} Kmoment03. Alla rättigheter reserverade.</p>
</footer>
  )
}

export default Footer