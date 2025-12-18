
import { Slide, GroupMember } from './types';

export const MEMBERS: GroupMember[] = [
  { name: 'Alcantara, Shaina Jana S.' },
  { name: 'Imperial, Chynna Mae L.' },
  { name: 'Ocfemia, Karl David Z.' },
  { name: 'Portugal, Aloysious Irish O.' }
];

export const SLIDES: Slide[] = [
  {
    id: 'cover',
    type: 'title',
    title: 'OS Deadlock - Detection and Resolution',
    subtitle: 'CS 114 - Operating Systems | BSCS 3A',
    headerIcon: 'terminal'
  },
  {
    id: 'intro',
    type: 'content',
    title: 'What is a Deadlock?',
    headerIcon: 'alert',
    content: [
      'Deadlock occurs in a multi-processing system when a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
      'It’s the digital equivalent of a "Traffic Jam" where no car can move because every car is blocking another.'
    ]
  },
  {
    id: 'coffman',
    type: 'interactive',
    title: 'The Four Coffman Conditions',
    subtitle: 'The ingredients for a system freeze. All 4 must coexist.',
    headerIcon: 'key',
    points: [
      { 
        label: 'Mutual Exclusion', 
        description: 'Only one process at a time can use the resource.',
        deadlockImpact: 'In our kitchen, if two chefs could use the same knife at once, there would be no waiting. Since they can\'t, the resource becomes a bottleneck.',
        icon: 'lock'
      },
      { 
        label: 'Hold and Wait', 
        description: 'Processes keep resources they already have while waiting for new ones.',
        deadlockImpact: 'A chef refuses to put down the knife while waiting for the bread. This "selfish" behavior prevents others from using the knife to finish their own work.',
        icon: 'hand'
      },
      { 
        label: 'No Preemption', 
        description: 'Resources cannot be forcibly taken from a process.',
        deadlockImpact: 'If a manager could snatch the knife from a waiting chef, the deadlock would break. Without preemption, we are stuck until the chef releases it voluntarily.',
        icon: 'shield'
      },
      { 
        label: 'Circular Wait', 
        description: 'A set of processes wait for each other in a closed loop.',
        deadlockImpact: 'This is the final lock. P1 waits for P2, who waits for P3, who waits for P1. No one is first in line, and no one can move.',
        icon: 'refresh'
      }
    ]
  },
  {
    id: 'scenario',
    type: 'split',
    title: 'The Kitchen Scenario',
    subtitle: 'A Relatable Analogy',
    headerIcon: 'chef',
    content: [
      'Chefs (Processes) need a combination of Tools (Resources) to finish a dish.',
      'Chef 1: Needs Knife & Bread',
      'Chef 2: Needs Bread & Plate',
      'Chef 3: Needs Plate & Knife',
      'Watch how the system enters a frozen state...'
    ],
    visualId: 'scenario-status'
  },
  {
    id: 'rag-step-1',
    type: 'split',
    title: 'Step 1: Partial Acquisition',
    subtitle: 'P1 claims the Knife',
    headerIcon: 'knife',
    content: [
      'Chef P1 successfully acquires the Knife (Resource K).',
      'P1 now requests the Bread (Resource B), which is currently free.',
      'Wait... Chef P2 is faster!'
    ],
    visualId: 'rag-graph',
    visualStep: 1
  },
  {
    id: 'rag-step-2',
    type: 'split',
    title: 'Step 2: The Competition',
    subtitle: 'P2 claims the Bread',
    headerIcon: 'bread',
    content: [
      'Chef P2 acquires the Bread (B).',
      'P1 is now stuck waiting for B.',
      'P2 requests the Plate (P), but Chef P3 is already there.'
    ],
    visualId: 'rag-graph',
    visualStep: 2
  },
  {
    id: 'rag-step-3',
    type: 'split',
    title: 'Step 3: The Deadlock Closes',
    subtitle: 'P3 claims the Plate',
    headerIcon: 'plate',
    content: [
      'Chef P3 acquires the Plate (P).',
      'P2 is now stuck waiting for P.',
      'P3 requests the Knife (K)... but P1 is holding it!',
      'THE CIRCLE IS COMPLETE.'
    ],
    visualId: 'rag-graph',
    visualStep: 3
  },
  {
    id: 'prevention-interactive',
    type: 'simulation',
    title: 'Interactive: Breaking the Cycle',
    subtitle: 'Applying Linear Resource Ordering',
    headerIcon: 'prevent',
    content: [
      'In a "Safe System", we assign a hierarchy to resources.',
      'Chefs MUST pick up the tool with the lower number first.',
      '1. Knife | 2. Bread | 3. Plate',
      'By forcing Chef P3 to wait for the Knife (1) before grabbing the Plate (3), the cycle never forms!'
    ],
    visualId: 'rag-graph-safe'
  },
  {
    id: 'prevention',
    type: 'strategy',
    title: 'Strategy 1: Prevention',
    subtitle: 'Eliminating one of the 4 conditions',
    headerIcon: 'prevent',
    points: [
      { label: 'Invalidate Mutual Exclusion', description: 'Convert non-shareable resources to shareable ones via spooling or virtualization.', icon: 'unlock' },
      { label: 'Invalidate Hold and Wait', description: 'Require processes to request all resources at start, preventing incremental claims.', icon: 'bundle' },
      { label: 'Allow Preemption', description: 'Forcibly take resources from waiting processes to reallocate to higher priority ones.', icon: 'shield-off' },
      { label: 'Invalidate Circular Wait', description: 'Impose a strict resource hierarchy. Processes must request in ascending numeric order.', icon: 'sort' }
    ]
  },
  {
    id: 'avoidance',
    type: 'strategy',
    title: 'Strategy 2: Avoidance',
    subtitle: 'The Banker\'s Algorithm',
    headerIcon: 'bank',
    points: [
      { 
        label: 'Prior Knowledge', 
        description: 'System knows the maximum resources each process will ever need before they start.', 
        icon: 'brain' 
      },
      { 
        label: 'Safe State Checking', 
        description: 'Resources are only allocated if the resulting state allows everyone to finish eventually.', 
        icon: 'check-circle' 
      },
      { 
        label: 'Resource Denial', 
        description: 'Requests are blocked if they lead to an unsafe state, even if resources are free.', 
        icon: 'cross-circle' 
      }
    ]
  },
  {
    id: 'recovery',
    type: 'strategy',
    title: 'Strategy 3: Detection & Recovery',
    subtitle: 'Let it happen, then fix it',
    headerIcon: 'search',
    points: [
      { label: 'Process Termination', description: 'Abort all deadlocked processes or one-by-one until the cycle is broken.', icon: 'terminate' },
      { label: 'Resource Preemption', description: 'Preempt resources from one process and give to another until deadlock clears.', icon: 'transfer' },
      { label: 'System Rollback', description: 'Return to a known safe checkpoint and restart execution from that point.', icon: 'history' }
    ]
  },
  {
    id: 'conclusion',
    type: 'conclusion',
    title: 'Final Summary',
    headerIcon: 'book',
    content: [
      'Deadlocks are complex but predictable through Graph Theory (RAG cycles).',
      'Prevention is often too restrictive; Detection is often too expensive.',
      'Most modern OS (like Windows/Linux) prioritize performance and use manual intervention for rare deadlocks.'
    ]
  }
];

