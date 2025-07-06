'use client'

import { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/ui/button'
import Image from 'next/image'


export function SignaturePad() {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const [signature, setSignature] = useState('')

  const clear = () => {
    sigCanvas.current?.clear()
    setSignature('')
  }

  const save = () => {
    if (sigCanvas.current) {
      setSignature(sigCanvas.current.toDataURL())
    }
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-2">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'w-full h-40',
          }}
        />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={clear}>
          Limpar
        </Button>
        <Button type="button" onClick={save}>
          Salvar Assinatura
        </Button>
      </div>
      {signature && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Assinatura salva:</p>
          <Image src={signature || "/placeholder.svg"} alt="Assinatura" className="border rounded-md" />
        </div>
      )}
    </div>
  )
}
