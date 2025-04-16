"use client";

import styles from "./DeleteModal.module.css";

export default function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.message}>회원탈퇴 하시겠습니까?</p>
        <p className={styles.message}>
          회원틸퇴를 진행하시면 계정을 복구할 수 없습니다.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
