// === Sistemas Incompatíveis ===

// 1. Sistema Legado 
class LegacyPaymentSystem {
    makePayment(amount) {
      console.log(`Pagando R$${amount} com sistema legado.`);
    }
  }
  
  // 2. API Moderna 
  class ModernPaymentAPI {
    process(amountInCents) {
      console.log(`Pagamento de R$${amountInCents / 100} via API moderna.`);
    }
  }
  
  // === O Adapter ===
  
  class ModernPaymentAdapter {
    constructor(modernApi) {
      this.modernApi = modernApi;
    }
  
    // Este é o método que o PaymentProcessor (cliente) espera
    makePayment(amount) {
      const amountInCents = amount * 100;
      
      this.modernApi.process(amountInCents);
    }
  }
  
  // === Cliente ===
  
  class PaymentProcessor {
    constructor(system) {
      this.system = system;
    }
  
    pay(amount) {
      this.system.makePayment(amount);
    }
  }
  
  
  console.log("--- Testando com Sistema Legado ---");
  const legacy = new LegacyPaymentSystem();
  const legacyProcessor = new PaymentProcessor(legacy);
  legacyProcessor.pay(100); 
  
  console.log("\n--- Testando com API Moderna (Adaptada) ---");
  const modernAPI = new ModernPaymentAPI();
  const modernAdapter = new ModernPaymentAdapter(modernAPI);
  

  const modernProcessor = new PaymentProcessor(modernAdapter);
  modernProcessor.pay(450); 