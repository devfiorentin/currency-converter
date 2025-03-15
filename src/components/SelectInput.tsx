import { useState } from "react";
import axios from "axios";


function SelectInput() {
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const handleConversion = async () => {
    try {
      const response = await axios.get(
        `https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`
      );

      const rate = response.data[`${fromCurrency}${toCurrency}`].bid;
      const convertedAmount = (parseFloat(amount) * parseFloat(rate)).toFixed(
        2
      );
      setResult(`${convertedAmount} ${toCurrency}`);
    } catch (error) {
      console.error(error);
      setResult("Erro na conversão");
    }
  };

  return (
    <div className="p-10 flex items-center justify-center">
      <section className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Conversor de Moedas
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="space-y-4 w-full md:w-1/2">
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="BRL">Real (BRL)</option>
              <option value="USD">Dólar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="BTC">Bitcoin (BTC)</option>
            </select>

            <input
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Digite o valor em ${fromCurrency}`}
            />
          </div>

          <div className="space-y-4 w-full md:w-1/2">
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">Dólar (USD)</option>
              <option value="BRL">Real (BRL)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="BTC">Bitcoin (BTC)</option>
            </select>

            {result ? (
              <div className="p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  Resultado: {result}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600 text-center">
                  Aguardando conversão...
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleConversion}
          className="w-full mt-8 bg-[#3FE140] hover:bg-[#3FE870] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Converter
        </button>
      </section>
    </div>
  );
}

export default SelectInput;
