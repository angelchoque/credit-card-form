import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import chip from '../assets/chip-tarjeta.png'
import visa from '../assets/visa.png'
import masterCard from '../assets/mastercard.png'
import americanEx from '../assets/americanexold.png'

const cardType = {
  amex: "3",
  visa: "4",
  mastercard: "5"
}

const Home: NextPage = () => {
  const formRef = useRef(null)
  const [cardRotate, setCardRotate] = useState(false)

  const [imgLogo, setImgLogo] = useState("")
  const [cardNum, setCardNum] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiration, setCardExpiration] = useState("")
  const [cardCCV, setCardCCV] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(formRef.current)
  }

  const bgImage = () => {
    if (imgLogo === cardType.amex) return "bg-backg-amex"
    if (imgLogo === cardType.visa) return "background-visa"
    if (imgLogo === cardType.mastercard) return "background-mastercard"
    return "background-img"
  }

  const handleMaxlen = () => {
    if (imgLogo === cardType.visa) return 16 + 3
    if (imgLogo === cardType.mastercard) return 16 + 3
    return 19 + 4
  }

  return (
    <>
      <div className="card flex min-h-screen justify-center md:items-center bg-slate-500 text-blue-500">
        <div className="w-full md:max-w-md bg-white md:rounded-lg overflow-hidden pt-6 sm:p-6 md:my-28">
          <div
            onClick={() => setCardRotate(!cardRotate)}
            className="cursor-pointer w-[325px] h-[210px] mx-auto md:h-[250px] md:w-[400px]"
          >
            <div
              className={`card-container select-none text-white
              ${cardRotate && "active"} relative z-20 mx-auto`}
            >
              {/* FRONT */}
              <div
                className={`card-bank overflow-hidden p-5 card-bank-front rounded-lg bg-cover bg-center
                shadow-[0_35px_10px_-15px_rgba(0,0,0,0.3)] ${bgImage()} text-sm h-[210px] md:h-[250px]`}
              >
                <div className='min-h-[50px] md:h-[80px]'>
                  {imgLogo === "4" && 
                    <div className="ml-auto w-20 md:w-32">
                      <Image src={visa} alt="visa logo" className='object-cover' />
                    </div>
                  }
                  {imgLogo === "5" && 
                    <div className="ml-auto w-20 md:w-32">
                      <Image src={masterCard} alt="mastercard logo" className='object-cover' />
                    </div>
                  }
                  {imgLogo === "3" && 
                    <div className="ml-auto w-20 md:w-32">
                      <Image src={americanEx} alt="american express logo" className='object-cover' />
                    </div>
                  }
                  {!imgLogo && <div className="ml-auto rounded bg-gray-600 w-24 h-10 md:h-12"></div>}
                </div>
                <div className='w-[40px]'>
                  <Image src={chip} alt="chip"/>
                </div>
                <div className="">
                  <div className="drop-shadow-[1px_1px_4px_rgba(20,10,10,1)]">
                    {/* <p className="text-sm text-">Card Number</p> */}
                    <p className="md:text-2xl">{cardNum || "#### #### #### ####"}</p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <div className="">
                      <p className="text-sm text-gray-700">Name</p>
                      <div className="name uppercase">{cardName || "Jhon Doe"}</div>
                    </div>
                    <div className="">
                      <p className="text-sm text-gray-700">Expiration</p>
                      <p className="uppercase">
                        {cardExpiration || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div
                className={`card-bank p-5 card-bank-back absolute top-0 left-0 w-full rounded-lg
                overflow-hidden bg-cover shadow-[0_35px_10px_-15px_rgba(0,0,0,0.3)]
                ${bgImage()} h-[210px] md:h-[250px]`}
              >
                <div className='w-full h-10 md:h-12 bg-black absolute left-0 right-0'>
                </div>
                <div className='flex mt-14 items-center'>
                  <div className="flex flex-col w-8/12">
                    <small className='w-20 h-3 md:h-4 rounded bg-gray-600 my-1'></small>
                    <div className="info w-full h-6 md:h-8"></div>
                  </div>
                  <div className="flex flex-col">
                    <small>CCV</small>
                    <div className="bg-white h-5 md:h-7 text-gray-400 px-2 italic">{cardCCV || "ccv"}</div>
                  </div>
                </div>
                <div className='mt-6'>
                  <small className='w-32 h-3 md:h-4 rounded bg-gray-600 my-1 block'></small>
                  <small className='w-44 h-3 md:h-4 rounded bg-gray-600 my-1 block'></small>
                  <small className='w-32 h-3 md:h-4 rounded bg-gray-600 my-1 block'></small>
                </div>
              </div>
            
            </div>
          </div>

          <form ref={formRef} className="flex flex-col gap-3 mt-5 text-gray-800 max-w-[500px] mx-auto px-4 md:px-0" onSubmit={handleSubmit}>
            <input
              type="text"
              value={cardNum}
              onChange={e => {
                const valor = e.target.value.replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{4})/g, '$1 ').trim()
                setCardNum(valor)
                setImgLogo(valor[0])
              }}
              maxLength={handleMaxlen()}
              placeholder='Card'
              className='border-solid bg-gray-100 border-2 rounded-lg w-full p-4 outline-none focus:border-blue-500 transition-[.3s] uppercase'
              autoComplete='off'
              onFocus={() => setCardRotate(false)}
            />
            <input
              type="text"
              pattern='[A-Za-z ]{0,70}'
              value={cardName}
              placeholder='Name'
              className='border-solid bg-gray-100 border-2 rounded-lg w-full p-4 outline-none focus:border-blue-500 transition-[.3s] uppercase'
              onChange={e => e.target.validity.valid && setCardName(e.target.value)}
              onFocus={() => setCardRotate(false)}
            />
            <div className="flex gap-3">
              <input
                type="text"
                value={cardExpiration}
                placeholder='Date'
                maxLength={5}
                className='border-solid bg-gray-100 border-2 rounded-lg w-1/2 p-4 outline-none focus:border-blue-500 transition-[.3s] uppercase'
                onChange={e => {
                  const valor = e.target.value.replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{2})/g, '$1/')
                  const val = valor.length === 6 ? valor.replace(/.$/, '') : valor
                  setCardExpiration(val)
                }}
                onFocus={() => setCardRotate(false)}
              />
              <input
                type="text"
                placeholder='ccv'
                value={cardCCV}
                maxLength={4}
                pattern={"[0-9]{0,5}"}
                onChange={e => e.target.validity.valid && setCardCCV(e.target.value)}
                onFocus={() => setCardRotate(true)}
                className='border-solid bg-gray-100 border-2 rounded-lg w-1/2 p-4 outline-none focus:border-blue-500 transition-[.3s] uppercase'
              />
            </div>
            
            <button
              className='w-full bg-green-500 hover:bg-green-600 py-4 rounded-lg
              text-white mt-auto outline-green-300 transition-[.5s]'
            >
              Pagar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Home
