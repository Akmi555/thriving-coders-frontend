import { mdiCar, mdiPlus, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import CardBoxComponentEmpty from '../../components/CardBox/Component/Empty'
import NotificationBar from '../../components/NotificationBar'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import VehiclesTable from 'components/Table/VehiclesTable'


const VehiclesPage: React.FC=()=>{

    return(
            <>
              <Head>
                <title>{getPageTitle('Vehicles overview')}</title>
              </Head>
              <SectionMain>
                <SectionTitleLineWithButton icon={mdiCar} title="Vehicles" main>
                  <Button
                    href="/vehicles/add/vehicle"
                    icon={mdiPlus}
                    label="Add vehicle"
                    color="contrast"
                    roundedFull
                    small
                  />
                </SectionTitleLineWithButton>
        
               { /*<NotificationBar color="info" icon={mdiMonitorCellphone}>
                  <b>Responsive table.</b> Collapses on mobile
                </NotificationBar>*/}
        
                <CardBox className="mb-6" hasTable>
                 { /*<TableSampleClients />*/}
                 <VehiclesTable/>
                </CardBox>
        
                <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />
        
                <NotificationBar color="danger" icon={mdiTableOff}>
                  <b>Empty card.</b> When there&apos;s nothing to show
                </NotificationBar>
        
                <CardBox>
                  <CardBoxComponentEmpty />
                </CardBox>
              </SectionMain>
            </>
    );
};
export default VehiclesPage;