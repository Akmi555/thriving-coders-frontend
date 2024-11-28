import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import CardBox from '../components/CardBox'
import LayoutGuest from '../layouts/Guest'
import SectionMain from '../components/Section/Main'
import { gradientBgPurplePink } from '../colors'
import { appTitle } from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode } from '../stores/darkModeSlice'

const StyleSelectPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(()=>{
      // set style white at load
      const currentStyle = Array.from(document.documentElement.classList).find((token) =>
        token.startsWith('style')
      )

      if (currentStyle) {
        document.documentElement.classList.replace(currentStyle, 'style-white')
      } else {
        document.documentElement.classList.add('style-white')
      }   
      router.push('/dashboard')
  }, [dispatch])
}

export default StyleSelectPage
