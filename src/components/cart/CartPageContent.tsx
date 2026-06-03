"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, MapPin, ArrowLeft, ShoppingCart, ChevronRight, Check, Store, Truck, CreditCard, Banknote, QrCode } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCart, CartItem } from '../../contexts/CartContext';

type Step = 1 | 2 | 3;
type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'money';

export default function CartPageContent() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  // Checkout State
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotalOriginal = cartItems.reduce((acc: number, item: CartItem) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const subtotalComDesconto = cartItems.reduce((acc: number, item: CartItem) => {
    const itemPrice = item.promotionalPrice || item.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const totalDesconto = subtotalOriginal - subtotalComDesconto;
  const frete = deliveryMethod === 'delivery' ? 15.00 : 0; // Mock de frete para visualização, 0 se for retirar na loja
  const totalFinal = subtotalComDesconto + frete;

  if (!mounted) {
    return null;
  }

  const handleWhatsAppCheckout = () => {
    let message = `Olá! Gostaria de finalizar meu pedido.\n\n*Resumo do Pedido:*\n`;
    cartItems.forEach(item => {
      const itemPrice = item.promotionalPrice || item.price;
      message += `${item.quantity}x ${item.name} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itemPrice)}\n`;
    });
    
    message += `\n*Subtotal:* ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalComDesconto)}`;
    if (deliveryMethod === 'delivery') {
      message += `\n*Frete:* ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(frete)}`;
    }
    message += `\n*Total:* ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalFinal)}\n`;
  
    message += `\n*Método de Entrega:* ${deliveryMethod === 'delivery' ? 'Entrega em domicílio' : 'Retirada na loja'}`;
    
    const paymentLabels = {
      pix: 'PIX',
      credit_card: 'Cartão de Crédito',
      debit_card: 'Cartão de Débito',
      money: 'Dinheiro'
    };
    
    message += `\n*Forma de Pagamento:* ${paymentLabels[paymentMethod]}`;
    
    const encodedMessage = encodeURIComponent(message);
    // Por enquanto não deve enviar para o WhatsApp
    // window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="py-8 md:py-12 grow">
      <Container>
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-amber-950 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-semibold text-amber-950">Carrinho</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 font-serif">
            Seu Carrinho
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Revise seus produtos naturais e finalize o pedido com segurança.
          </p>
        </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-[#FFFDF4] rounded-3xl border border-black/5 shadow-sm">
          <div className="w-24 h-24 bg-[#F5EED8] rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-[#2E8B57] opacity-60" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-amber-950 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
            Parece que você ainda não escolheu nenhum produto. Que tal explorar nossa variedade de itens naturais?
          </p>
          <Link href="/products">
            <Button className="py-6 px-10 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white font-bold transition-all border-none">
              Ver Produtos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Steps Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${currentStep >= 1 ? 'bg-[#2E8B57] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className={`text-xs font-semibold ${currentStep >= 1 ? 'text-[#2E8B57]' : 'text-gray-400'}`}>Carrinho</span>
              </div>
              <div className={`h-1 flex-1 mx-2 rounded-full ${currentStep >= 2 ? 'bg-[#2E8B57]' : 'bg-gray-200'}`} />
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${currentStep >= 2 ? 'bg-[#2E8B57] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className={`text-xs font-semibold ${currentStep >= 2 ? 'text-[#2E8B57]' : 'text-gray-400'}`}>Entrega</span>
              </div>
              <div className={`h-1 flex-1 mx-2 rounded-full ${currentStep >= 3 ? 'bg-[#2E8B57]' : 'bg-gray-200'}`} />
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${currentStep >= 3 ? 'bg-[#2E8B57] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
                <span className={`text-xs font-semibold ${currentStep >= 3 ? 'text-[#2E8B57]' : 'text-gray-400'}`}>Pagamento</span>
              </div>
            </div>

            {/* Step 1: Items */}
            {currentStep === 1 && (
              <div className="bg-[#FFFDF4] rounded-2xl shadow-sm border border-black/5 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-4 mb-6 border-b border-black/5 pb-4">
                  <div className="p-2 -ml-2 text-gray-400">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-amber-950">Itens do Pedido</h2>
                </div>
                <div className="flex flex-col">
                  {cartItems.map((item: CartItem) => {
                    const currentPrice = item.promotionalPrice || item.price;
                    
                    return (
                      <div key={item.id} className="flex gap-4 py-4 border-b border-black/5 last:border-0 last:pb-0 first:pt-0 relative group">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xl overflow-hidden shrink-0 border border-black/5">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col grow justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg text-amber-950">{item.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{item.unit}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3 bg-white border border-black/10 rounded-lg p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1.5 text-gray-500 hover:text-amber-950 transition-colors cursor-pointer"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center text-amber-950">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1.5 text-gray-500 hover:text-amber-950 transition-colors cursor-pointer"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right flex flex-col">
                              {item.promotionalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                </span>
                              )}
                              <span className="text-lg font-bold text-amber-950">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Delivery */}
            {currentStep === 2 && (
              <div className="bg-[#FFFDF4] rounded-2xl shadow-sm border border-black/5 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-4 mb-6 border-b border-black/5 pb-4">
                  <button onClick={() => setCurrentStep(1)} className="p-2 -ml-2 text-gray-400 hover:text-amber-950 transition-colors cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-bold text-amber-950">Opções de Entrega</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`flex flex-col gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'delivery' ? 'border-[#2E8B57] bg-emerald-50/50' : 'border-black/5 bg-white hover:border-black/10'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${deliveryMethod === 'delivery' ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-amber-950">Entrega em Domicílio</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'delivery' ? 'border-[#2E8B57]' : 'border-gray-300'}`}>
                        {deliveryMethod === 'delivery' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-11">Receba seus produtos no conforto da sua casa. Taxa fixa de R$ 15,00.</p>
                    <input type="radio" name="delivery" value="delivery" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} className="sr-only" />
                  </label>

                  <label className={`flex flex-col gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all ${deliveryMethod === 'pickup' ? 'border-[#2E8B57] bg-emerald-50/50' : 'border-black/5 bg-white hover:border-black/10'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${deliveryMethod === 'pickup' ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Store className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-amber-950">Retirar na Loja</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'pickup' ? 'border-[#2E8B57]' : 'border-gray-300'}`}>
                        {deliveryMethod === 'pickup' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 ml-11">Retire seu pedido diretamente em nossa loja sem custo adicional.</p>
                    <input type="radio" name="delivery" value="pickup" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="sr-only" />
                  </label>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="mt-8 pt-6 border-t border-black/5">
                    <h3 className="font-semibold text-amber-950 mb-4">Endereço de Entrega</h3>
                    <div className="flex gap-2">
                      <div className="relative grow max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Digite seu CEP" 
                          className="block w-full pl-9 pr-3 py-2.5 bg-white border border-black/10 rounded-lg focus:ring-amber-500 focus:border-amber-500 sm:text-sm outline-none"
                        />
                      </div>
                      <Button variant="secondary" className="px-6 bg-white border border-black/10 text-amber-950 hover:bg-gray-50">Buscar</Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-[#FFFDF4] rounded-2xl shadow-sm border border-black/5 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-4 mb-6 border-b border-black/5 pb-4">
                  <button onClick={() => setCurrentStep(2)} className="p-2 -ml-2 text-gray-400 hover:text-amber-950 transition-colors cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-bold text-amber-950">Método de Pagamento</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-[#2E8B57] bg-emerald-50/50' : 'border-black/5 bg-white hover:border-black/10'}`}>
                    <div className={`p-2.5 rounded-lg ${paymentMethod === 'pix' ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <QrCode className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-amber-950 flex-1">PIX</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-[#2E8B57]' : 'border-gray-300'}`}>
                      {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />}
                    </div>
                    <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} className="sr-only" />
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-[#2E8B57] bg-emerald-50/50' : 'border-black/5 bg-white hover:border-black/10'}`}>
                    <div className={`p-2.5 rounded-lg ${paymentMethod === 'credit_card' ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-amber-950 flex-1">Cartão de Crédito</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-[#2E8B57]' : 'border-gray-300'}`}>
                      {paymentMethod === 'credit_card' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />}
                    </div>
                    <input type="radio" name="payment" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="sr-only" />
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'debit_card' ? 'border-[#2E8B57] bg-emerald-50/50' : 'border-black/5 bg-white hover:border-black/10'}`}>
                    <div className={`p-2.5 rounded-lg ${paymentMethod === 'debit_card' ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-amber-950 flex-1">Cartão de Débito</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'debit_card' ? 'border-[#2E8B57]' : 'border-gray-300'}`}>
                      {paymentMethod === 'debit_card' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />}
                    </div>
                    <input type="radio" name="payment" value="debit_card" checked={paymentMethod === 'debit_card'} onChange={() => setPaymentMethod('debit_card')} className="sr-only" />
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'money' ? 'border-[#2E8B57] bg-emerald-50/50' : 'border-black/5 bg-white hover:border-black/10'}`}>
                    <div className={`p-2.5 rounded-lg ${paymentMethod === 'money' ? 'bg-[#2E8B57] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Banknote className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-amber-950 flex-1">Dinheiro</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'money' ? 'border-[#2E8B57]' : 'border-gray-300'}`}>
                      {paymentMethod === 'money' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />}
                    </div>
                    <input type="radio" name="payment" value="money" checked={paymentMethod === 'money'} onChange={() => setPaymentMethod('money')} className="sr-only" />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Resumo do Pedido Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#FFFDF4] rounded-2xl shadow-sm border border-black/5 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-amber-950 mb-6">Resumo do Pedido</h2>
              
              {/* Items Summary (visible only on step 2 and 3) */}
              {currentStep > 1 && (
                <div className="mb-6 pb-6 border-b border-black/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-amber-950">Itens ({cartItems.length})</span>
                    <button onClick={() => setCurrentStep(1)} className="text-sm text-[#2E8B57] hover:underline">Editar</button>
                  </div>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-2">{item.quantity}x {item.name}</span>
                        <span className="font-medium text-amber-950 shrink-0">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.promotionalPrice || item.price) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Valores */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className={`font-medium ${totalDesconto > 0 ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotalOriginal)}
                  </span>
                </div>
                
                {totalDesconto > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Desconto</span>
                    <span className="font-medium text-gray-900">
                      - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDesconto)}
                    </span>
                  </div>
                )}

                {currentStep >= 2 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="font-medium text-gray-900">
                      {frete > 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(frete) : 'Grátis'}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-black/5 mt-3 pt-3 flex justify-between items-end">
                  <span className="font-bold text-amber-950 text-lg">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-amber-950 block">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalFinal)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                {currentStep === 1 && (
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-6 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white flex items-center justify-center gap-2 border-none transition-all"
                  >
                    Próximo Passo
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
                {currentStep === 2 && (
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-6 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white flex items-center justify-center gap-2 border-none transition-all"
                  >
                    Ir para Pagamento
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button 
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-6 text-lg rounded-full shadow-md bg-[#2E8B57] hover:bg-green-700 text-white flex items-center justify-center gap-2 border-none transition-all"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Finalizar no WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
      </Container>
    </div>
  );
}