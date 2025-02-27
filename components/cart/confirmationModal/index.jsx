"use client";
import { FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./styles.module.css";

export default function ConfirmationModal({
  onClose,
  onConfirm,
  orderDetails,
  totalPrice,
  deliveryFee,
}) {
  if (!orderDetails) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Confirmar Pedido</h2>
          <button
            type="button"
            aria-label="Fechar modal de confirmação"
            className={styles.closeButton}
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <h3>Itens do Pedido:</h3>
          <div className={styles.productList}>
            {orderDetails.products.map((item, index) => (
              <div key={index} className={styles.productItem}>
                <span>
                  {item.quantity} {item.unit === "KG" ? "g" : "UN"}{" "}
                  - {item.name}
                </span>
                <span>R$ {item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {deliveryFee > 0 && (
            <div className={styles.deliveryFee}>
              <span>Taxa de Entrega:</span>
              <span>R$ {deliveryFee.toFixed(2)}</span>
            </div>
          )}

          <div className={styles.totalPrice}>
            <span>Total:</span>
            <span>R$ {totalPrice}</span>
          </div>

          <div className={styles.customerInfo}>
            <h3>Dados do Pedido:</h3>
            <p>
              <strong>Nome:</strong> {orderDetails.name}
            </p>
            {orderDetails.deliveryOption === "frete" ? (
              <>
                <p>
                  <strong>Endereço:</strong> {orderDetails.address}
                </p>
                <p>
                  <strong>Bairro:</strong> {orderDetails.neighborhood}
                </p>
                <p>
                  <strong>Cidade:</strong>{" "}
                  {orderDetails.city === "charqueadas"
                    ? "Charqueadas"
                    : "São Jerônimo"}
                </p>
              </>
            ) : (
              <p>
                <strong>Retirada:</strong> No local
              </p>
            )}
            <p>
              <strong>Pagamento:</strong> {orderDetails.paymentMethod}
            </p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            <FaWhatsapp />
            Confirmar e Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
