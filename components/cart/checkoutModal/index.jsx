'use client';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './styles.module.css';
import { useCart } from '@/context/CartContext';
import ConfirmationModal from '../confirmationModal';

export default function CheckoutModal({ formData, handleInputChange, onClose }) {
  const { cart, clearCart } = useCart();
  const [localFormData, setLocalFormData] = useState({
    name: formData.name || '',
    address: formData.address || '',
    neighborhood: formData.neighborhood || '',
    paymentMethod: formData.paymentMethod || '',
    deliveryOption: formData.deliveryOption || 'busca',
    city: formData.city || ''
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Set PIX as payment method when delivery option is 'frete'
    if (localFormData.deliveryOption === 'frete') {
      setLocalFormData(prev => ({
        ...prev,
        paymentMethod: 'PIX'
      }));
    }
  }, [localFormData.deliveryOption]);

  const calculateDeliveryFee = () => {
    if (localFormData.deliveryOption !== 'frete') return 0;
    switch (localFormData.city) {
      case 'charqueadas':
        return 8;
      case 'sao_jeronimo':
        return 22;
      default:
        return 0;
    }
  };

  const calculateTotalPrice = () => {
    if (!cart || cart.length === 0) return '0.00';
    
    const subtotal = cart.reduce((total, item) => {
      const itemTotal = item.unit === 'KG'
        ? (item.price / 1000) * item.quantity
        : item.price * item.quantity;
      return total + itemTotal;
    }, 0);

    const deliveryFee = calculateDeliveryFee();
    return (subtotal + deliveryFee).toFixed(2);
  };

  const formatProductList = () => {
    if (!cart || cart.length === 0) return [];
    
    return cart.map(item => {
      const total = item.unit === 'KG'
        ? (item.price / 1000) * item.quantity
        : item.price * item.quantity;
      
      return {
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        total
      };
    });
  };

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset city when changing to local pickup
      ...(name === 'deliveryOption' && value === 'busca' && { 
        city: '',
        paymentMethod: ''
      })
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!localFormData.name?.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (localFormData.deliveryOption === 'frete') {
      if (!localFormData.address?.trim()) {
        newErrors.address = 'Endereço é obrigatório';
      }
      if (!localFormData.neighborhood?.trim()) {
        newErrors.neighborhood = 'Bairro é obrigatório';
      }
      if (!localFormData.city) {
        newErrors.city = 'Cidade é obrigatória';
      }
    }

    if (!localFormData.paymentMethod?.trim()) {
      newErrors.paymentMethod = 'Método de pagamento é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log

    if (!cart || cart.length === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar a compra');
      return;
    }

    if (validateForm()) {
      console.log('Form is valid'); // Debug log
      const details = {
        products: formatProductList(),
        name: localFormData.name,
        address: localFormData.address,
        neighborhood: localFormData.neighborhood,
        city: localFormData.city,
        deliveryOption: localFormData.deliveryOption,
        paymentMethod: localFormData.paymentMethod
      };
      console.log('Order details:', details); // Debug log
      setOrderDetails(details);
      setShowConfirmation(true);
    }
  };

  const handleConfirmOrder = () => {
    const deliveryFee = calculateDeliveryFee();
    const message = `Olá, gostaria de realizar um pedido! Meu nome é ${localFormData.name}.

PRODUTOS:
${orderDetails.products.map(item => `${item.quantity}${item.unit} - ${item.name} (R$ ${item.total.toFixed(2)})`).join('\n')}
${deliveryFee > 0 ? `\nTaxa de entrega: R$ ${deliveryFee.toFixed(2)}` : ''}
TOTAL: R$ ${calculateTotalPrice()}
ENDEREÇO: ${localFormData.deliveryOption === 'frete' ? localFormData.address : 'Retirada no local'}
BAIRRO: ${localFormData.deliveryOption === 'frete' ? localFormData.neighborhood : '-'}
CIDADE: ${localFormData.deliveryOption === 'frete' ? localFormData.city === 'charqueadas' ? 'Charqueadas' : 'São Jerônimo' : '-'}
OPÇÃO DE ENTREGA: ${localFormData.deliveryOption}
MÉTODO DE PAGAMENTO: ${localFormData.paymentMethod}`;

    window.open(
      `https://wa.me/5551997572837?text=${encodeURIComponent(message)}`, 
      '_blank'
    );

    clearCart();
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
        <div className={styles.checkoutContainer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.checkoutHeader}>
            <h2>Finalizar Compra</h2>
            <button aria-label="Fechar modal de checkout" className={styles.closeButton} onClick={onClose}>
              <FiX />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={localFormData.name}
                onChange={handleLocalInputChange}
                required
                placeholder="Digite seu nome completo"
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </label>

            <div className={styles.radioGroup}>
              <label 
                className={localFormData.deliveryOption === 'frete' ? styles.active : ''}
                onClick={() => handleLocalInputChange({ 
                  target: { 
                    name: 'deliveryOption', 
                    value: 'frete' 
                  } 
                })}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="frete"
                  checked={localFormData.deliveryOption === 'frete'}
                  onChange={handleLocalInputChange}
                />
                <span>Frete</span>
              </label>
              <label 
                className={localFormData.deliveryOption === 'busca' ? styles.active : ''}
                onClick={() => handleLocalInputChange({ 
                  target: { 
                    name: 'deliveryOption', 
                    value: 'busca' 
                  } 
                })}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="busca"
                  checked={localFormData.deliveryOption === 'busca'}
                  onChange={handleLocalInputChange}
                />
                <span>Retirar no Local</span>
              </label>
            </div>

            {localFormData.deliveryOption === 'frete' && (
              <>
                <label>
                  Cidade:
                  <select
                    name="city"
                    value={localFormData.city}
                    onChange={handleLocalInputChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Selecione a cidade</option>
                    <option value="charqueadas">Charqueadas</option>
                    <option value="sao_jeronimo">São Jerônimo</option>
                  </select>
                  {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
                  {localFormData.city && (
                    <span className={styles.deliveryFee}>
                      Taxa de entrega: R$ {calculateDeliveryFee().toFixed(2)}
                    </span>
                  )}
                </label>

                <label>
                  Endereço:
                  <input
                    type="text"
                    name="address"
                    value={localFormData.address}
                    onChange={handleLocalInputChange}
                    required
                    placeholder="Rua, número, complemento"
                  />
                  {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
                </label>

                <label>
                  Bairro:
                  <input
                    type="text"
                    name="neighborhood"
                    value={localFormData.neighborhood}
                    onChange={handleLocalInputChange}
                    required
                    placeholder="Seu bairro"
                  />
                  {errors.neighborhood && <span className={styles.errorMessage}>{errors.neighborhood}</span>}
                </label>
              </>
            )}

            <label>
              Método de Pagamento:
              {localFormData.deliveryOption === 'frete' ? (
                <input
                  type="text"
                  name="paymentMethod"
                  value="PIX"
                  readOnly
                  className={styles.select}
                />
              ) : (
                <select
                  name="paymentMethod"
                  value={localFormData.paymentMethod}
                  onChange={handleLocalInputChange}
                  required
                  className={styles.select}
                >
                  <option value="">Selecione o método de pagamento</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="PIX">PIX</option>
                </select>
              )}
              {errors.paymentMethod && <span className={styles.errorMessage}>{errors.paymentMethod}</span>}
            </label>

            <div className={styles.checkoutFooter}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancelar
              </button>
              <button 
                type="submit" 
                className={styles.whatsappButton}
                disabled={!cart || cart.length === 0}
              >
                <FaWhatsapp />
                Revisar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmOrder}
          orderDetails={orderDetails}
          totalPrice={calculateTotalPrice()}
          deliveryFee={calculateDeliveryFee()}
        />
      )}
    </>
  );
}
