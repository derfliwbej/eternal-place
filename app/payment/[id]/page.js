'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import fetchUtil from "@/utils/fetchUtil";

import { CircularProgress } from "@mui/material";
import ErrorText from "@/components/prompt/ErrorText";

import styles from "@/app/styles/PaymentPage.module.css";

const Button = ({ type, disabled, onClick, children }) => {
    const getClassName = disabled ? styles['disabled-button'] : (type === 'confirm' ? styles['confirm-button'] : styles['cancel-button']);
    
    return (
        <div className={getClassName} onClick={onClick}>
            {children}
        </div>
    )
};

const LoadingPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress sx={{ color: '#37b47e'}} />
        </div>
    );
}

const ErrorPage = ({ body }) => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['main-container']}>
                {body}
            </div>
        </div>
    );
};

const SuccessfulPaymentPage = ({ transaction }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const onButtonClick = () => {
        setLoading(true);
        router.push('/transaction/create');
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['main-container']}>
                <h1 className={styles['header']}>Payment Successful</h1>
                <ul style={{ listStyleType: 'none' }}>
                    <li>User ID: {transaction.user_id}</li>
                    <li>Lot ID: {transaction.lot_id}</li>
                    <li>Date Created: {transaction.date_created}</li>
                    <li>Amount: PHP{transaction.amount}.00</li>
                    <li>Reference Number: {transaction.reference_num}</li>
                </ul>
                <Button type="confirm" disabled={loading} onClick={onButtonClick}>Go Back to Merchant</Button>
            </div>
        </div>
    );
};

const PaymentPage = ({ params }) => {
    const router = useRouter();
    const { id } = params;

    const [lot, setLot] = useState({});
    const [initialLoading, setInitialLoading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);
    const [transactionInformation, setTransactionInformation] = useState({});
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [initialError, setInitialError] = useState('');
    const [requestError, setRequestError] = useState('');

    const onConfirmPayment = () => {
        const makeRequest = async () => {
            try {
                setRequestError('');
                setRequestLoading(true);

                const res = await fetchUtil(`/user/payment?id=${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const transaction = await res.json();

                console.log(transaction);

                setTransactionInformation(transaction);
                setPaymentSuccessful(true);
            } catch(error) {
                setRequestError(error.message);
            } finally {
                setRequestLoading(false);
            }
        };

        makeRequest();
    };

    const onCancelPayment = () => {
        setRequestLoading(true);
        router.push('/transaction/create');
    };

    useEffect( () => {
        const getPaymentInformation = async () => {
            try {
                setInitialLoading(true);

                const res = await fetchUtil(`/user/payment?id=${id}`);
                const lot = await res.json();

                setLot(lot);
            } catch(error) {
                setInitialError(error.message);
            } finally {
                setInitialLoading(false);
            }
        };

        getPaymentInformation();
    }, []);
    
    return (
        <>
            {initialLoading ? <LoadingPage /> : ( initialError ? <ErrorPage body={initialError} /> : 
                ( paymentSuccessful ? <SuccessfulPaymentPage transaction={transactionInformation} /> :(
                <>
                    <div className={styles['logo-container']}>
                        <Image src='/paymongo.svg' width={200} height={34} />
                    </div>
                    <div className={styles['wrapper']}>
                        <div className={styles['main-container']}>
                            {requestLoading ? <CircularProgress sx={{ color: '#37b47e' }} /> : null}
                            <h1 className={styles['header']}>GCash Test Payment Page</h1>
                            {requestError && (<ErrorText>{requestError}</ErrorText>)}
                            <p>This is a test payment of PHP {lot.tomb_count * 500}.00 for Lot ID {lot.id}</p>
                            <div className={styles['buttons-container']}>
                                <Button type="confirm" disabled={requestLoading} onClick={onConfirmPayment}>Confirm Payment</Button>
                                <Button type="cancel" disabled={requestLoading} onClick={onCancelPayment}>Cancel Payment</Button>
                            </div>
                        </div>
                    </div>
                </>
            )))}
        </>
    );
};

export default PaymentPage;