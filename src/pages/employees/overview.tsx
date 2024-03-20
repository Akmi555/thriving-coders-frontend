import { mdiAccountPlus, mdiMonitorCellphone, mdiAccountGroup , mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import CardBoxComponentEmpty from '../../components/CardBox/Component/Empty'
import LayoutAuthenticated from '../../layouts/Authenticated'
import NotificationBar from '../../components/NotificationBar'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableSampleClients from '../../components/Table/SampleClients'
import { getPageTitle } from '../../config'

const EmployeesOverviewPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Employees overview')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccountGroup } title="Employees overview" main>
          <Button
            href="#"
            // target="_blank"
            icon={mdiAccountPlus}
            label="Add new employee"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        {/* <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar> */}

        <CardBox className="mb-6" hasTable>
          <TableSampleClients />
        </CardBox>

        {/* <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" /> */}

        {/* <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar> */}

        <CardBox>
          <CardBoxComponentEmpty />
        </CardBox>
      </SectionMain>
    </>
  )
}

EmployeesOverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default EmployeesOverviewPage